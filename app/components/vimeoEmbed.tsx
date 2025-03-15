import React from "react";

interface VimeoEmbedProps {
  url: string;
}

const VimeoEmbed: React.FC<VimeoEmbedProps> = ({ url }) => {
  // Extract video ID from the Vimeo URL
  const videoId = url.split("/").pop();

  return (
    <div style={{width: "100%", height: "100%", objectFit: "contain"}}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}?background=0&byline=0&portrait=0&title=0&controls=1`}
        width="100%"
        height="100%"
        allow="fullscreen; picture-in-picture; showcontrols"
        style={{border: 'none'}}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VimeoEmbed;
