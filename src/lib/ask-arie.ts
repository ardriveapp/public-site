/**
 * Ask Arie - ar.io Marketing Website Chat Widget
 *
 * API integration and types for the Ask Arie widget.
 * Uses external API: https://sparklechat-3bzk.onrender.com/marketing/ask
 */

export interface HealthEndpoint {
  path: string;
  method: string;
  status: string;
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  chat_available: boolean;
  duckdb_available?: boolean;
  openai_available?: boolean;
  live_pricing_available?: boolean;
  endpoints: HealthEndpoint[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
  meta?: {
    citations?: Citation[];
    sourcesUsed?: number[];
    chunkCount?: number;
  };
}

export interface Citation {
  index: number;
  title: string;
  url: string;
  raw: string;
}

export interface ArieApiRequest {
  question: string;
  thread_id?: string;
}

export interface ArieApiResponse {
  answer: string;
  citations: string[];
  sources_used: number[];
  chunk_count: number;
  thread_id: string;
  message_id: string;
  parent_message_id: string | null;
}

/** API returns this on 200 when it needs clarification (ok: false, error_type: "needs_clarification"). */
export interface ArieClarifyingResult {
  kind: "clarifying";
  clarifying_question: string;
  thread_id?: string;
}

export interface AccessCheckResponse {
  allowed: boolean;
  reason?: string; // e.g., "allowed", "forbidden", "missing_origin"
}

/**
 * Fetch wrapper for the Ask Arie API.
 * POST to https://sparklechat-3bzk.onrender.com/marketing/ask
 *
 * Note: If CORS errors occur, the API server needs to add CORS headers:
 * Access-Control-Allow-Origin: https://ar-io.github.io, https://ar.io
 */
export type ArieApiResult = ArieApiResponse | ArieClarifyingResult;

export async function askArie(question: string, threadId?: string | null): Promise<ArieApiResult> {
  const endpoint = "https://sparklechat-3bzk.onrender.com/marketing/ask";

  // Add page context to make the AI aware of the current page
  const currentPageUrl = window.location.href;
  const currentPageTitle = document.title;

  // Prepend page context to make the AI aware of the current page
  const contextualQuestion = `[Page: ${currentPageTitle}]\n[${currentPageUrl}]\n\n${question}`;

  const payload: ArieApiRequest = { question: contextualQuestion };

  // Include thread_id if available (for conversation continuity)
  if (threadId) {
    payload.thread_id = threadId;
  }

  // Try direct fetch first
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (fetchError) {
    // Network errors (including CORS preflight failures) throw exceptions
    const isCorsError = 
      fetchError instanceof TypeError && 
      (fetchError.message.includes("Failed to fetch") ||
       fetchError.message.includes("NetworkError"));
    
    if (isCorsError) {
      // Use a public CORS proxy as fallback (temporary workaround until API is fixed)
      // Note: This is not ideal for production - the API should fix CORS headers
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(endpoint)}`;
      
      try {
        response = await fetch(proxyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (proxyError) {
        throw new Error(
          "CORS error: The Ask Arie API needs to allow requests from this domain. " +
          "Please contact the API maintainer to add CORS headers for https://ar-io.github.io and https://ar.io"
        );
      }
    } else {
      throw fetchError;
    }
  }

  // Check if response is readable (CORS errors make response opaque)
  if (!response.ok && response.status === 0) {
    // Likely a CORS error - try proxy fallback
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(endpoint)}`;
    try {
      response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (proxyError) {
      throw new Error(
        "CORS error: The Ask Arie API needs to allow requests from this domain. " +
        "Please contact the API maintainer to add CORS headers for https://ar-io.github.io and https://ar.io"
      );
    }
  }

  if (!response.ok) {
    let errorMessage = "Failed to get response from Ask Arie service";

    try {
      const errorBody = await response.text();
      if (errorBody) {
        errorMessage = `Ask Arie service error: ${errorBody}`;
      }
    } catch {
      // If we can't read the error body, use the status
      errorMessage = `Ask Arie service error (${response.status}): ${response.statusText}`;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();

  // Clarifying question (ok: false, error_type: "needs_clarification") — valid conversational response, not an error
  if (
    data &&
    data.ok === false &&
    data.error_type === "needs_clarification" &&
    typeof data.clarifying_question === "string"
  ) {
    return {
      kind: "clarifying",
      clarifying_question: data.clarifying_question,
      thread_id: typeof data.thread_id === "string" ? data.thread_id : undefined,
    };
  }

  // Basic validation for success response
  if (typeof data.answer !== "string") {
    throw new Error("Invalid response format: missing answer");
  }
  if (!Array.isArray(data.citations)) {
    throw new Error("Invalid response format: missing citations array");
  }
  if (!Array.isArray(data.sources_used)) {
    throw new Error("Invalid response format: missing sources_used array");
  }
  if (typeof data.chunk_count !== "number") {
    throw new Error("Invalid response format: missing chunk_count");
  }
  if (typeof data.thread_id !== "string") {
    throw new Error("Invalid response format: missing thread_id");
  }
  if (typeof data.message_id !== "string") {
    throw new Error("Invalid response format: missing message_id");
  }
  if (data.parent_message_id !== null && typeof data.parent_message_id !== "string") {
    throw new Error("Invalid response format: parent_message_id must be string or null");
  }

  return data as ArieApiResponse;
}

/**
 * Parse a citation string in the format [Title](url) or [Title](url "optional title")
 * Returns a Citation object or null if parsing fails.
 */
export function parseCitationMarkdownLink(rawCitation: string): Citation | null {
  // Regex to match [Title](url) format, optionally with title in quotes
  const markdownLinkRegex = /^\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/;

  const match = rawCitation.match(markdownLinkRegex);
  if (!match) {
    return null;
  }

  const [, title, url] = match;
  return {
    index: 0, // Will be set by caller based on position
    title: title.trim(),
    url: url.trim(),
    raw: rawCitation,
  };
}

/**
 * Convert API response to a ChatMessage with parsed citations.
 */
export function createAssistantMessageFromApiResponse(
  response: ArieApiResponse,
  messageId: string
): ChatMessage {
  const citations: Citation[] = response.citations
    .map((citationStr, index) => {
      const parsed = parseCitationMarkdownLink(citationStr);
      if (parsed) {
        return { ...parsed, index: index + 1 }; // 1-based indexing
      }
      // Fallback for unparseable citations
      return {
        index: index + 1,
        title: citationStr,
        url: "",
        raw: citationStr,
      };
    })
    .filter((citation) => citation.title.trim() !== "");

  return {
    id: messageId,
    role: "assistant",
    content: response.answer,
    createdAt: Date.now(),
    meta: {
      citations,
      sourcesUsed: response.sources_used,
      chunkCount: response.chunk_count,
    },
  };
}

/**
 * Generate a unique message ID.
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if the current origin is allowed to use the marketing endpoint.
 * Returns true if access is granted, false otherwise.
 *
 * Makes a request to /access-check endpoint with the current origin to validate permissions.
 */
export async function checkMarketingAccess(): Promise<boolean> {
  try {
    const endpoint = "https://sparklechat-3bzk.onrender.com/access-check?resource=marketing_ask";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Origin": window.location.origin,
      },
    });

    if (!response.ok) {
      console.warn(`Access check failed with status: ${response.status}`);
      return false;
    }

    const data: AccessCheckResponse = await response.json();

    if (data.reason) {
      console.info(`Access check result: ${data.reason}`);
    }

    return data.allowed === true;
  } catch (error) {
    console.error("Access check request failed:", error);
    return false;
  }
}

/**
 * Check the health status of the Ask Arie service.
 * Returns true if the service is healthy and ready to handle marketing questions.
 *
 * Checks 4 conditions:
 * 1. Overall service health (status === 'ok')
 * 2. Chat available (chat_available === true)
 * 3. Marketing endpoint is registered (endpoints array contains '/marketing/ask' POST endpoint)
 * 4. Current origin is allowed to use the marketing endpoint (access check)
 */
export async function checkAskArieHealth(): Promise<boolean> {
  try {
    // Step 1: Check service health
    const endpoint = "https://sparklechat-3bzk.onrender.com/health";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`Health check failed with status: ${response.status}`);
      return false;
    }

    const data: HealthCheckResponse = await response.json();

    // Check overall service health
    const serviceOk = data.status === "ok";

    // Check chat is available
    const chatAvailable = data.chat_available === true;

    // Check if marketing endpoint is registered
    const marketingEndpoint = data.endpoints?.find(
      (ep) => ep.path === "/marketing/ask" && ep.method === "POST"
    );
    const endpointReady = marketingEndpoint?.status === "registered";

    // All health conditions must be true
    const isHealthy = serviceOk && chatAvailable && endpointReady;

    if (!isHealthy) {
      console.warn("Ask Arie health check failed:", {
        serviceOk,
        chatAvailable,
        endpointReady,
      });
      return false;
    }

    // Step 2: Check access permissions
    const accessAllowed = await checkMarketingAccess();
    if (!accessAllowed) {
      console.warn('Access check failed: This origin is not allowed to use the marketing endpoint');
      return false;
    }

    return true;
  } catch (error) {
    console.warn("Health check request failed:", error);
    return false;
  }
}