'use client';

import { useFlashcards } from '../../hooks/useFlashcards';
import { FlashcardsResponse } from '../../services';
import { useLocale } from '../providers/LocaleProvider';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Group } from '../../types';
import { useGroup } from '../../hooks/useGroups';

interface FlashcardsClientProps {
  initialData: FlashcardsResponse | null;
  group: Group | undefined;
  deckId: number;
  initialError: string | null;
}

const hexToRgba = (hex: string, opacity: number = 0.8) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function FlashcardsClient({
  initialData,
  deckId,
  group,
}: FlashcardsClientProps) {
  const locale = useLocale();
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const flashcardsQuery = useFlashcards(1, deckId, locale, initialData);
  const groupQuery = useGroup(group?.id || 0, locale, group);

  const flashcards = useMemo(() => {
    return flashcardsQuery.data?.member || [];
  }, [flashcardsQuery.data?.member]);

  const groupData = groupQuery.data;

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(console.error);
    }
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= flashcards.length || isTransitioning) return;

      setIsTransitioning(true);
      setCurrentIndex(index);

      // Play audio for the new flashcard
      const currentFlashcard = flashcards[index];
      if (currentFlashcard?.audioUrl) {
        playAudio(currentFlashcard.audioUrl);
      }

      setTimeout(() => setIsTransitioning(false), 300);
    },
    [flashcards, isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse wheel handling
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) > 50) {
        event.preventDefault();
        if (event.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [nextSlide, prevSlide]);

  if (flashcardsQuery.isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white text-xl">
        Loading...
      </div>
    );
  }

  if (flashcardsQuery.error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-red-900 text-white text-xl">
        Error loading flashcards
      </div>
    );
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div
      ref={containerRef}
      className="w-full  overflow-hidden relative flex-1 flex flex-col"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 rounded-full w-15 h-15 hover:bg-black/70 transition-colors duration-200 flex items-center justify-center text-white text-xl font-bold md:block hidden"
          disabled={isTransitioning}
        >
          ‹
        </button>
      )}

      {currentIndex < flashcards.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 rounded-full w-15 h-15 hover:bg-black/70 transition-colors duration-200 flex items-center justify-center text-white text-xl font-bold md:block hidden"
          disabled={isTransitioning}
        >
          ›
        </button>
      )}

      {/* Flashcard container */}
      <div className="relative w-full h-full flex-1">
        {currentFlashcard && (
          <div
            key={currentFlashcard.id}
            className={`absolute inset-0 flex justify-center items-center p-6 pb-8 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              background: (() => {
                const baseColor = currentFlashcard.backgroundColor || '#ffffff';
                const centerColor = hexToRgba(baseColor, 0.5);
                const edgeColor = baseColor;
                return `radial-gradient(circle, ${centerColor} 0%, ${edgeColor} 100%)`;
              })(),
            }}
            data-flashcard-media-id={currentFlashcard.flashcardMedia?.id}
            data-flashcard-id={currentFlashcard.id}
          >
            {/* Image container */}
            <div className="flex-1 flex items-center justify-center pb-30 relative">
              <div
                className="relative w-[80vw] h-[60vh] float rotate"
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <Image
                  src={
                    currentFlashcard.optimizedImageUrl ||
                    currentFlashcard.imageUrl ||
                    ''
                  }
                  alt={currentFlashcard.name || 'Flashcard image'}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
                  style={{
                    maxHeight: '60vh',
                    maxWidth: '80vw',
                    backgroundColor: 'transparent',
                  }}
                  priority={currentIndex === 0}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L3N2Zz4K"
                />
              </div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[90%] text-center z-10">
              <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 leading-tight drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
                {currentFlashcard.name}
              </h1>
              {group?.name && (
                <p className="text-white text-xl sm:text-xl md:text-2xl lg:text-3xl opacity-90 drop-shadow-[0_0_8px_rgba(0,0,0,1)]">
                  {groupData?.getNameTranslation()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {flashcards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      <audio ref={audioRef} id="audioPlayer" preload="metadata" />

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(3deg);
          }
          50% {
            transform: rotate(0deg);
          }
          75% {
            transform: rotate(-3deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .float {
          animation: float 4s ease-in-out infinite;
        }

        .rotate {
          animation: rotate 8s ease-in-out infinite;
        }

        .float.rotate {
          animation: float 4s ease-in-out infinite,
            rotate 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
