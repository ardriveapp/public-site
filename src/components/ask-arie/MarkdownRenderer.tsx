interface MarkdownRendererProps {
  text: string;
  messageId?: string;
}

/**
 * Simple markdown renderer for chat messages.
 * Handles basic formatting without external dependencies.
 */
export function MarkdownRenderer({ text, messageId }: MarkdownRendererProps) {
  const lines = text.split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;

  const renderInline = (value: string, keyPrefix: string) => {
    // Order matters: code, markdown links, bold, tokens, italic.
    const tokenRegex =
      /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\[(?:Source|Sources)\s+\d+\]|\[[A-Z0-9_]{3,}\]|\*[^*]+\*)/g;

    const parts = value.split(tokenRegex).filter((p) => p !== "");

    return parts.map((part, idx) => {
      const k = `${keyPrefix}_${idx}`;

      // Inline code: `code`
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={k}
            className="rounded bg-fd-muted px-1 py-0.5 font-mono text-[11px] text-fd-foreground"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Markdown link: [Title](url)
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/^\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/);
        if (match) {
          const [, label, href] = match;
          const isExternal = /^https?:\/\//i.test(href);
          return (
            <a
              key={k}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="text-fd-primary underline underline-offset-2 hover:opacity-80"
            >
              {label}
            </a>
          );
        }
      }

      // Bold: **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={k} className="font-semibold text-fd-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Source marker: [Source 4] → superscript (optionally link to citations block)
      {
        const sourceMatch = part.match(/^\[(?:Source|Sources)\s+(\d+)\]$/);
        if (sourceMatch) {
          const n = sourceMatch[1];
          const href = messageId ? `#arie-citation-${messageId}-${n}` : undefined;

          const sup = (
            <sup
              className="ml-0.5 mr-0.5 align-super text-[10px] font-medium text-fd-primary leading-none"
              aria-label={`Source ${n}`}
            >
              {n}
            </sup>
          );

          return href ? (
            <a
              key={k}
              href={href}
              className="no-underline hover:opacity-80"
              aria-label={`Jump to source ${n}`}
            >
              {sup}
            </a>
          ) : (
            <span key={k}>{sup}</span>
          );
        }
      }

      // Token: [LIVE_SOMETHING] → render as subtle pill
      if (part.startsWith("[") && part.endsWith("]")) {
        const token = part.slice(1, -1);
        if (/^[A-Z0-9_]{3,}$/.test(token)) {
          return (
            <span
              key={k}
              className="inline-flex items-center rounded-full border border-fd-border bg-fd-background/70 px-2 py-0.5 align-baseline font-mono text-[11px] text-fd-muted-foreground"
            >
              {token}
            </span>
          );
        }
      }

      // Italic: *text*
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        // Avoid treating "**bold**" as italic (already handled above)
        if (!(part.startsWith("**") && part.endsWith("**"))) {
          return (
            <em key={k} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }
      }

      return <span key={k}>{part}</span>;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headers
    if (line.startsWith("# ")) {
      elements.push(
        <div key={key++} className="mt-3 text-sm font-semibold text-fd-foreground first:mt-0">
          {renderInline(line.slice(2), `h1_${i}`)}
        </div>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <div key={key++} className="mt-3 text-sm font-semibold text-fd-foreground first:mt-0">
          {renderInline(line.slice(3), `h2_${i}`)}
        </div>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <div key={key++} className="mt-2 text-sm font-medium text-fd-foreground first:mt-0">
          {renderInline(line.slice(4), `h3_${i}`)}
        </div>
      );
    }
    // Lists
    else if (line.match(/^\d+\.\s/) || line.match(/^[-*]\s/)) {
      const isOrdered = line.match(/^\d+\.\s/);
      const listItems: string[] = [];
      let j = i;

      // Collect list items.
      // Important: allow blank lines between items (common in LLM output / markdown),
      // otherwise each item becomes its own <ol> starting at 1.
      const markerRegex = isOrdered ? /^\d+\.\s/ : /^[-*]\s/;
      while (j < lines.length) {
        const current = lines[j] ?? "";

        if (markerRegex.test(current)) {
          const itemText = current.replace(markerRegex, "");
          listItems.push(itemText);
          j++;
          continue;
        }

        // Skip blank lines if the next non-empty line continues the same list.
        if (current.trim() === "") {
          let k = j + 1;
          while (k < lines.length && (lines[k] ?? "").trim() === "") k++;

          if (k < lines.length && markerRegex.test(lines[k] ?? "")) {
            j = k;
            continue;
          }

          break;
        }

        // Non-blank, non-marker line: end of this list block.
        break;
      }

      if (isOrdered) {
        elements.push(
          <ol key={key++} className="list-decimal list-inside mb-2 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-fd-foreground">
                {renderInline(item, `ol_${i}_${idx}`)}
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={key++} className="list-disc list-inside mb-2 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-fd-foreground">
                {renderInline(item, `ul_${i}_${idx}`)}
              </li>
            ))}
          </ul>
        );
      }

      i = j - 1; // Skip processed lines
    }
    // Code blocks
    else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++; // Skip opening ```
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={key++}
          className="mb-2 overflow-x-auto rounded-md bg-fd-muted p-3 text-[11px] text-fd-foreground"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    }
    // Empty lines
    else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    }
    // Regular paragraphs
    else {
      elements.push(
        <p key={key++} className="text-sm leading-5 text-fd-foreground">
          {renderInline(line, `p_${i}`)}
        </p>
      );
    }
  }

  return <div className="space-y-2">{elements}</div>;
}