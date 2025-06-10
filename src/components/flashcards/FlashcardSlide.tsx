'use client';

import Image from 'next/image';
import { Flashcard } from '../../types';

interface FlashcardSlideProps {
  flashcard: Flashcard;
  backgroundStyle: string;
  isTransitioning: boolean;
  groupName?: string;
  onPlayAudio?: (audioUrl: string) => void;
}

export function FlashcardSlide({
  flashcard,
  backgroundStyle,
  isTransitioning,
  groupName,
  onPlayAudio,
}: FlashcardSlideProps) {
  const isTransparentBackground = flashcard.transparency == true;

  const handleImageClick = () => {
    if (flashcard.audioUrl && onPlayAudio) {
      onPlayAudio(flashcard.audioUrl);
    }
  };

  return (
    <div
      key={flashcard.id}
      className={`absolute inset-0 flex justify-center items-center p-2 pb-8 transition-all duration-200 ease-out ${
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        background: backgroundStyle,
        willChange: 'opacity, transform',
      }}
      data-flashcard-media-id={flashcard.flashcardMedia?.id}
      data-flashcard-id={flashcard.id}
    >
      {/* Image container */}
      <div className="flex-1 flex items-center justify-center pb-30 relative">
        <div
          className="relative w-auto h-[60vh] float rotate flex items-center justify-center"
          style={{ backgroundColor: 'transparent' }}
          onClick={handleImageClick}
        >
          <Image
            src={flashcard.optimizedImageUrl || flashcard.imageUrl || ''}
            alt={flashcard.name || 'Flashcard image'}
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1200px) 60vw, 50vw"
            className={`object-contain transition-transform duration-300 hover:scale-105 w-auto h-auto max-h-[60vh] sm:max-w-[80vw] w-full sm:w-auto ${
              !isTransparentBackground ? 'rounded-3xl shadow-lg' : ''
            }`}
            style={{
              backgroundColor: 'transparent',
            }}
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L3N2Zz4K"
          />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[90%] text-center z-10">
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 leading-tight drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
          {flashcard.name}
        </h1>
        {groupName && (
          <p className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl opacity-90 drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
            {groupName}
          </p>
        )}
      </div>
    </div>
  );
}
