function getEmbedUrl(url: string): string {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "vimeo.com" || host.endsWith(".vimeo.com")) {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    return `https://player.vimeo.com/video/${id}?byline=0&portrait=0&title=0`;
  }

  if (host === "youtu.be") {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    return `https://www.youtube.com/embed/${id}`;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).pop();
    return `https://www.youtube.com/embed/${id}`;
  }

  // other streaming links: embed as-is and hope the host allows framing
  return url;
}

export default function VideoEmbed({ url }: { url: string }) {
  const src = getEmbedUrl(url);

  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute inset-0 w-full h-full border-none"
        src={src}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
