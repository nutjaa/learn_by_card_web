'use client';

import Image from 'next/image';
import { Flashcard } from '../../types';

interface ImagePreloaderProps {
  flashcards: Flashcard[];
  currentIndex: number;
}

export function ImagePreloader({
  flashcards,
  currentIndex,
}: ImagePreloaderProps) {
  if (flashcards.length === 0) return null;

  return (
    <div className="hidden">
      {flashcards.map((flashcard, index) => {
        // Skip the current image as it's already loaded in the main view
        if (index === currentIndex) return null;

        // Determine if this image should have priority (adjacent slides)
        const isAdjacent = Math.abs(index - currentIndex) === 1;

        return (
          <Image
            key={flashcard.id}
            src={flashcard.optimizedImageUrl || flashcard.imageUrl || ''}
            alt=""
            width={1}
            height={1}
            priority={isAdjacent}
            loading={isAdjacent ? 'eager' : 'lazy'}
          />
        );
      })}
    </div>
  );
}
