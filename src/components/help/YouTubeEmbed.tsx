"use client";

interface YouTubeEmbedProps {
  videoId: string;
}

/**
 * Help article embed — MDX passes this at compile time (no import in .mdx files).
 */
export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <div className="relative my-8 aspect-video w-full overflow-hidden rounded-xl border border-fd-border/10">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
