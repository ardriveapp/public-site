# ArDrive Public Site

A modern Next.js marketing site for ArDrive's decentralized data solutions, featuring MDX content and static export for GitHub Pages.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v4
- **Content:** MDX with TypeScript
- **Deployment:** Static export (GitHub Pages compatible)

## Quick Start

```bash
yarn install
yarn dev
```

Visit `http://localhost:3000` to see the site.

## Project Structure

```
content/           # MDX articles, case studies, use cases
public/            # Static assets and images
src/
  app/            # Next.js App Router pages
  components/     # React components
  lib/            # Content loaders and utilities
```

## Key Sections

- **Articles** (`/articles`) — Blog posts and technical content
- **Case Studies** (`/case-studies`) — Project implementations
- **Use Cases** (`/use-cases`) — Industry applications
- **Ecosystem** (`/ecosystem`) — Partner projects
- **Cloudmap** (`/cloudmap`) — Gateway locations

## Ask Arie Widget

A floating chat widget powered by AI that provides instant Q&A about ar.io products and documentation.

### Features

- **Floating Button**: Bottom-right corner floating button with message icon
- **AI-Powered Responses**: Uses external chat API
- **Threaded Conversations**: Maintains conversation context across questions (per-tab persistence)
- **New Chat**: Reset conversations and start fresh with a new thread
- **Citations**: Displays clickable citations in `[Title](url)` format with "sources used" indices
- **Mobile Responsive**: Full-screen modal on mobile, anchored panel on desktop
- **Copy to Clipboard**: Copy assistant responses with one click
- **Error Handling**: Graceful fallbacks for API failures
- **Accessibility**: ESC to close, outside click, auto-focus input

### API Integration

**Request:**
```json
POST https://sparklechat-3bzk.onrender.com/marketing/ask
{
  "question": "user query string",
  "thread_id": "abc123..."  // Optional: reuse existing thread for conversation continuity
}
```

**Response:**
```json
{
  "answer": "AI-generated response text",
  "citations": ["[Title](url)", "[Another Title](url)"],
  "sources_used": [1, 2],
  "chunk_count": 42,
  "thread_id": "abc123...",        // Always present: thread identifier for conversation continuity
  "message_id": "msg456...",       // Always present: unique identifier for this assistant message
  "parent_message_id": null        // null for first turn, otherwise previous assistant message ID
}
```

### Technical Notes

- **Per-Tab Persistence**: Chat history and thread context persist across page reloads via `sessionStorage`
- **New Chat Button**: Reset conversations and start fresh (clears thread + messages)
- **Cross-Tab Isolation**: Each browser tab maintains independent conversation state
- **Static Export Safe**: No server-side features, works with GitHub Pages
- **CORS Enabled**: External API allows cross-origin requests

## Adding Content

Create MDX files in the appropriate `content/` directory with frontmatter. Images go in corresponding `public/` subdirectories. Display metadata (icons, labels, etc.) lives in `src/lib/*-config.ts` files.

> 📖 **Full Documentation**: See [AGENTS.md](AGENTS.md) for detailed content guidelines and technical specs.

## Build & Deploy

```bash
yarn build
```

Builds to static files in `/out`. Supports GitHub Pages deployment with automatic base path handling.


