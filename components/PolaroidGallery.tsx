'use client';

import Image from 'next/image';
import { getAssetUrl } from '@/lib/directus';
import { Permanent_Marker } from "next/font/google";

export const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

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


const DEFAULT_ROTATIONS = [-3, 1, 4];

export default function PolaroidGallery({ photos, className }: PolaroidGalleryProps) {
  return (
    <div className={`flex flex-wrap gap-2 py-10 justify-center ${permanentMarker.className} ${className || ''}`}>
      {photos.map((photo, index) => {
        const rotation = photo.rotationDeg ?? DEFAULT_ROTATIONS[index % DEFAULT_ROTATIONS.length];
        
        return (
          <div
            key={photo.fileId}
            className="p-4 rounded-sm shadow-sm shadow-slate-300 w-fit space-y-4 hover:shadow-xl bg-white hover:z-10 z-1 transition-all duration-300"
            style={{ 
              transform: `rotate(${rotation}deg)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `rotate(${rotation + 4}deg) scale(1.25)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
            }}
          >
            <PolaroidCard {...photo} />
          </div>
        );
      })}
    </div>
  );
}

function PolaroidCard({ fileId, title, subtitle }: PolaroidPhoto) {
  const src = getAssetUrl(fileId);

  return (
    <>
      {src && (
        <Image
          src={src}
          alt={title || 'Photo'}
          width={350}
          height={350}
          className="rounded-sm w-72 h-72 object-cover object-center"
          priority
          title={title}
        />
      )}

      <div className="space-y-1">
        {title && (
          <p className="text-center text-gray-800 text-lg">{title}</p>
        )}
        {subtitle && (
          <p className="text-center text-sm text-gray-800">{subtitle}</p>
        )}
      </div>
    </>
  );
}