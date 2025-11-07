'use client';

import Image from 'next/image';
import { getAssetUrl } from '@/lib/directus';

type PolaroidPhoto = {
  fileId: string;
  title?: string;
  subtitle?: string;
  rotationDeg?: number;
};

interface PolaroidGalleryProps {
  photos: PolaroidPhoto[];
  className?: string;
}

// Rotation presets
const DEFAULT_ROTATIONS = [-5, 4, -3];

export default function PolaroidGallery({ photos, className }: PolaroidGalleryProps) {
  return (
    <div className={"relative w-full max-w-4xl mx-auto h-[700px] " + (className || '')}>
      
      {/* PHOTO 1 — top left */}
      {photos[0] && (
        <figure
          className="absolute top-0 left-1/4 w-[240px] sm:w-[260px] bg-white text-black rounded-xl shadow-2xl"
          style={{ transform: `rotate(${photos[0].rotationDeg ?? DEFAULT_ROTATIONS[0]}deg)` }}
        >
          <PolaroidCard {...photos[0]} />
        </figure>
      )}

      {/* PHOTO 2 — top right */}
      {photos[1] && (
        <figure
          className="absolute top-4 right-1/4 w-[240px] sm:w-[260px] bg-white text-black rounded-xl shadow-2xl"
          style={{ transform: `rotate(${photos[1].rotationDeg ?? DEFAULT_ROTATIONS[1]}deg)` }}
        >
          <PolaroidCard {...photos[1]} />
        </figure>
      )}

      {/* PHOTO 3 — bottom center */}
      {photos[2] && (
        <figure
          className="absolute top-48 left-1/2 -translate-x-1/2 w-[260px] sm:w-[280px] bg-white text-black rounded-xl shadow-2xl"
          style={{ transform: `rotate(${photos[2].rotationDeg ?? DEFAULT_ROTATIONS[2]}deg)` }}
        >
          <PolaroidCard {...photos[2]} />
        </figure>
      )}
    </div>
  );
}

function PolaroidCard({ fileId, title, subtitle }: PolaroidPhoto) {
  const src = getAssetUrl(fileId);

  return (
    <>
      <div className="relative h-[320px] sm:h-[350px] overflow-hidden rounded-t-xl">
        {src && (
          <Image
            src={src}
            alt={title || 'Photo'}
            fill
            sizes="260px"
            className="object-cover"
          />
        )}
      </div>

      <figcaption className="px-5 py-4 text-center">
        {title && (
          <div className="font-semibold tracking-tight">{title}</div>
        )}
        {subtitle && (
          <div className="text-sm opacity-70">{subtitle}</div>
        )}
      </figcaption>
    </>
  );
}
