"use client";
import { useState } from "react";
import Image from "next/image";
import { GalleryImage } from "@/app/types/localTypes";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const current = images[index];

  const showPrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  const showNext = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full aspect-square">
        {current.src && (
          <Image
            className="w-full h-full object-contain"
            src={current.src}
            alt={current.alt || "no image description"}
            width={current.width}
            height={current.height}
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex flex-row gap-8">
          <button
            className="text-fg text-[1.5rem] bg-transparent border-none hover:text-brand-pink"
            onClick={showPrev}
            aria-label="Previous image"
          >
            &larr;
          </button>
          <button
            className="text-fg text-[1.5rem] bg-transparent border-none hover:text-brand-pink"
            onClick={showNext}
            aria-label="Next image"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
