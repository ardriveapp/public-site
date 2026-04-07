"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, X, Send, Copy, Check, RotateCcw } from "lucide-react";
import {
  type ArieApiResponse,
  ChatMessage,
  askArie,
  createAssistantMessageFromApiResponse,
  generateMessageId,
  checkAskArieHealth,
} from "@/lib/ask-arie";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { BaseImage } from "@/components/base-image";

interface AskArieWidgetProps {
  /** Optional initial messages for future persistence */
  initialMessages?: ChatMessage[];
}

const STARTER_QUESTIONS = [
  "What is ar.io?",
  "How do I get started?",
  "What's the difference between permanent storage and regular cloud storage?",
];

// Session storage keys for per-tab persistence
const ASK_ARIE_THREAD_ID_KEY = "ask-arie-thread-id";
const ASK_ARIE_MESSAGES_KEY = "ask-arie-messages";

export function AskArieWidget({ initialMessages = [] }: AskArieWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydrate threadId and messages from sessionStorage on mount
  useEffect(() => {
    if (!mounted) return;

    try {
      // Hydrate threadId
      const savedThreadId = sessionStorage.getItem(ASK_ARIE_THREAD_ID_KEY);
      if (savedThreadId) {
        setThreadId(savedThreadId);
      }

      // Hydrate messages (with fallback to initialMessages if none saved)
      const savedMessages = sessionStorage.getItem(ASK_ARIE_MESSAGES_KEY);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      }
    } catch (error) {
      // Clear corrupted data on parse errors
      console.warn("Failed to hydrate Ask Arie state from sessionStorage:", error);
      sessionStorage.removeItem(ASK_ARIE_THREAD_ID_KEY);
      sessionStorage.removeItem(ASK_ARIE_MESSAGES_KEY);
    }
  }, []); // Remove mounted and initialMessages from deps - we only want this to run once

  // Persist threadId changes to sessionStorage
  useEffect(() => {
    if (!mounted) return;

    if (threadId) {
      sessionStorage.setItem(ASK_ARIE_THREAD_ID_KEY, threadId);
    } else {
      sessionStorage.removeItem(ASK_ARIE_THREAD_ID_KEY);
    }
  }, [threadId, mounted]);

  // Persist messages changes to sessionStorage (cap to last 50 messages)
  useEffect(() => {
    if (!mounted) return;

    try {
      // Cap messages to last 50 to prevent unbounded growth
      const messagesToSave = messages.slice(-50);
      if (messagesToSave.length > 0) {
        sessionStorage.setItem(ASK_ARIE_MESSAGES_KEY, JSON.stringify(messagesToSave));
      } else {
        sessionStorage.removeItem(ASK_ARIE_MESSAGES_KEY);
      }
    } catch (error) {
      console.warn("Failed to persist Ask Arie messages to sessionStorage:", error);
    }
  }, [messages, mounted]);

  // Check Ask Arie service health on mount
  useEffect(() => {
    if (!mounted) return;

    const checkHealth = async () => {
      const healthy = await checkAskArieHealth();
      if (healthy) {
        // Add a slight delay before showing the chat icon for better UX
        setTimeout(() => {
          setIsHealthy(true);
        }, 1500); // 1.5 second delay
      } else {
        setIsHealthy(false);
      }
    };

    checkHealth();
  }, [mounted]);

  // Auto-scroll when user is already near the bottom (don't yank scroll if they're reading).
  useEffect(() => {
    const el = messagesScrollRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isNearBottom = distanceFromBottom < 140;
    if (!isNearBottom) return;

    // Defer to allow layout/height to settle for markdown blocks.
    const id = window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);

    return () => window.clearTimeout(id);
  }, [messages, isLoading]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeChat = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 180);
  }, []);


  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeChat();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeChat]);

  // Lock body scroll only on mobile-ish viewports (prevents background scroll).
  useEffect(() => {
    if (!isOpen) return;

    // Guard for older browsers / unexpected environments
    const isMobile =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 640px)").matches;

    if (!isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isLoading) return;

    setInputValue("");
    setError(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: "user",
      content: question,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await askArie(question, threadId);
      if ("kind" in response && response.kind === "clarifying") {
        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: "assistant",
          content: response.clarifying_question,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        if (response.thread_id) setThreadId(response.thread_id);
      } else {
        const assistantMessage = createAssistantMessageFromApiResponse(
          response as ArieApiResponse,
          generateMessageId()
        );
        setMessages((prev) => [...prev, assistantMessage]);
        if (response.thread_id) setThreadId(response.thread_id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, threadId]);

  const handleStarterQuestion = useCallback(async (question: string) => {
    if (isLoading) return;

    setError(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: "user",
      content: question,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await askArie(question, threadId);
      if ("kind" in response && response.kind === "clarifying") {
        const assistantMessage: ChatMessage = {
          id: generateMessageId(),
          role: "assistant",
          content: response.clarifying_question,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        if (response.thread_id) setThreadId(response.thread_id);
      } else {
        const assistantMessage = createAssistantMessageFromApiResponse(
          response as ArieApiResponse,
          generateMessageId()
        );
        setMessages((prev) => [...prev, assistantMessage]);
        if (response.thread_id) setThreadId(response.thread_id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, threadId]);

  const handleNewChat = useCallback(() => {
    if (isLoading) return;

    // Clear thread state
    setThreadId(null);
    sessionStorage.removeItem(ASK_ARIE_THREAD_ID_KEY);

    // Clear messages
    setMessages([]);
    sessionStorage.removeItem(ASK_ARIE_MESSAGES_KEY);

    // Clear any error state
    setError(null);

    // Clear input
    setInputValue("");
  }, [isLoading]);

  const handleCopyMessage = useCallback(async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopiedMessageId(messageId);
        setTimeout(() => setCopiedMessageId(null), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy text:", fallbackErr);
      }
    }
  }, []);

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeChat();
    }
  }, [closeChat]);

  if (!mounted) return null;

  const floatingButton = !isOpen && isHealthy ? (
    <button
      type="button"
      onClick={openChat}
      className="group fixed bottom-6 right-6 z-[9998] inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-fd-primary text-fd-background shadow-lg transition-all duration-200 ease-out hover:bg-fd-primary/90 hover:shadow-xl hover:scale-110 active:scale-95"
      aria-label="Open Ask Arie"
    >
      <MessageCircle className="size-6 transition-transform duration-200 ease-out group-hover:rotate-12" />
    </button>
  ) : null;

  const chatModal = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-[2px] transition-all duration-300 ease-out sm:items-end sm:justify-end sm:p-6"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
      onMouseDown={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Arie - Ask anything about ar.io"
    >
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-none border-0 bg-fd-background shadow-none transition-all duration-300 ease-out sm:h-[min(560px,calc(100vh-7rem))] sm:w-full sm:max-w-[420px] sm:flex-col sm:overflow-hidden sm:rounded-2xl sm:border sm:border-fd-border sm:bg-fd-background sm:shadow-2xl"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0) scale(1)"
            : "translateY(20px) scale(0.95)",
        }}
      >
        {/* Header */}
        <div
          className="flex-shrink-0 flex items-center justify-between border-b border-fd-border bg-fd-background px-4 py-3 transition-all duration-300 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "50ms",
          }}
        >
          <div className="min-w-0 flex items-center gap-3">
            <BaseImage
              src="/brand/ask-arie.png"
              alt="Ask Arie"
              width={48}
              height={48}
              className="shrink-0"
              unoptimized
            />
            <div className="min-w-0">
              <h2 className="text-lg font-bold tracking-tight text-fd-foreground">
                Ask Arie
              </h2>
              <p className="text-sm text-fd-muted-foreground">
                Ask anything about ar.io
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleNewChat}
              disabled={isLoading}
              className="shrink-0 inline-flex size-8 items-center justify-center rounded-full text-fd-foreground hover:bg-fd-accent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
              aria-label="Start new chat"
              title="Start new chat"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={closeChat}
              className="shrink-0 inline-flex size-8 items-center justify-center rounded-full text-fd-foreground hover:bg-fd-accent cursor-pointer transition-all duration-200"
              aria-label="Close Ask Arie"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 flex flex-col min-h-0 transition-all duration-300 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "100ms",
          }}
        >
          <div
            ref={messagesScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 && !isLoading && !error && (
              <div className="text-center text-fd-muted-foreground py-8">
                <MessageCircle className="size-8 mx-auto mb-4 opacity-50" />
                <p className="text-sm mb-4">
                  Ask me anything about ar.io!
                </p>
                <div className="space-y-2">
                  {STARTER_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleStarterQuestion(question)}
                      className="block w-full text-left px-3 py-2 text-sm text-fd-foreground bg-fd-card border border-fd-border rounded-lg hover:bg-fd-accent hover:scale-105 hover:shadow-md active:scale-95 transition-all duration-200 ease-out cursor-pointer"
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                data-message-id={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2 fade-in duration-300`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm transition-shadow duration-200 ${
                    message.role === "user"
                      ? "bg-fd-primary text-fd-background shadow-md"
                      : "bg-fd-card border border-fd-border text-fd-foreground shadow-sm hover:shadow-md"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <MarkdownRenderer text={message.content} messageId={message.id} />
                  )}

                  {/* Citations */}
                  {message.meta?.citations && message.meta.citations.length > 0 && (
                    <details className="mt-3 rounded-lg border border-fd-border bg-fd-background/70 px-2 py-1.5">
                      <summary className="cursor-pointer select-none text-xs font-medium text-fd-muted-foreground">
                        Sources ({message.meta.citations.length})
                      </summary>
                      <div className="mt-2 space-y-2">
                        {message.meta.sourcesUsed && message.meta.sourcesUsed.length > 0 && (
                          <p className="text-xs text-fd-muted-foreground">
                            Sources used: {message.meta.sourcesUsed.join(", ")}
                          </p>
                        )}

                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          {message.meta.citations.map((citation) => (
                            <li
                              key={citation.index}
                              id={`arie-citation-${message.id}-${citation.index}`}
                              className="text-fd-muted-foreground"
                            >
                              {citation.url ? (
                                <a
                                  href={citation.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-fd-primary hover:underline"
                                >
                                  {citation.title}
                                </a>
                              ) : (
                                citation.title
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </details>
                  )}

                  {/* Copy button for assistant messages */}
                  {message.role === "assistant" && (
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(message.id, message.content)}
                        className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground transition-colors"
                        aria-label="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <>
                            <Check className="size-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-full rounded-lg bg-fd-card border border-fd-border px-3 py-2 text-sm text-fd-foreground">
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-fd-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-fd-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="flex justify-start">
                <div className="w-full rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
                  <p className="font-medium mb-1">Unable to get response</p>
                  <p className="text-xs mb-2">{error}</p>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="text-xs underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex-shrink-0 border-t border-fd-border p-4 transition-all duration-300 ease-out"
            style={{
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "150ms",
            }}
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about ar.io..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-primary focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="inline-flex size-10 items-center justify-center rounded-lg bg-fd-primary text-fd-background hover:bg-fd-primary/90 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-out"
                aria-label="Send message"
              >
                <Send className={`size-4 transition-transform duration-150 ease-out ${isLoading ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {floatingButton}
      {createPortal(chatModal, document.body)}
    </>
  );
}