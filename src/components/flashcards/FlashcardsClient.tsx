'use client';

import { useFlashcards } from '../../hooks/useFlashcards';
import { FlashcardsResponse } from '../../services';
import { useLocale } from '../providers/LocaleProvider';
import { useRef, useMemo } from 'react';
import { Group } from '../../types';
import { useGroup } from '../../hooks/useGroups';
import { useFlashcardNavigation } from '../../hooks/useFlashcardNavigation';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useTouchNavigation } from '../../hooks/useTouchNavigation';
import { useWheelNavigation } from '../../hooks/useWheelNavigation';
import { FlashcardSlide } from './FlashcardSlide';
import { NavigationButtons } from './NavigationButtons';
import { ProgressIndicator } from './ProgressIndicator';
import { ImagePreloader } from './ImagePreloader';
import { FlashcardAnimations } from './FlashcardAnimations';

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

  const flashcardsQuery = useFlashcards(1, deckId, locale, initialData);
  const groupQuery = useGroup(group?.id || 0, locale, group);

  const flashcards = useMemo(
    () => flashcardsQuery.data?.member || [],
    [flashcardsQuery.data?.member]
  );
  const groupData = groupQuery.data;

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(console.error);
    }
  };

  const handleSlideChange = (index: number) => {
    const currentFlashcard = flashcards[index];
    if (currentFlashcard?.audioUrl) {
      playAudio(currentFlashcard.audioUrl);
    }
  };

  const { currentIndex, isTransitioning, goToSlide, nextSlide, prevSlide } =
    useFlashcardNavigation(flashcards.length, handleSlideChange);

  const backgroundStyles = useMemo(() => {
    return flashcards.map((flashcard) => {
      const baseColor = flashcard.backgroundColor || '#ffffff';
      const centerColor = hexToRgba(baseColor, 0.5);
      const edgeColor = baseColor;
      return `radial-gradient(circle, ${centerColor} 0%, ${edgeColor} 100%)`;
    });
  }, [flashcards]);

  // Navigation hooks
  useKeyboardNavigation(nextSlide, prevSlide);
  const touchHandlers = useTouchNavigation(nextSlide, prevSlide);
  useWheelNavigation(containerRef, nextSlide, prevSlide);

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
      suppressHydrationWarning
      ref={containerRef}
      className="w-full overflow-hidden relative flex-1 flex flex-col"
      style={{
        background: currentFlashcard
          ? backgroundStyles[currentIndex]
          : '#f0f0f0',
      }}
      {...touchHandlers}
    >
      <NavigationButtons
        currentIndex={currentIndex}
        totalSlides={flashcards.length}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        isTransitioning={isTransitioning}
      />

      <div className="relative w-full h-full flex-1">
        {currentFlashcard && (
          <FlashcardSlide
            flashcard={currentFlashcard}
            backgroundStyle={backgroundStyles[currentIndex]}
            isTransitioning={isTransitioning}
            groupName={groupData?.getNameTranslation()}
            onPlayAudio={playAudio}
          />
        )}
      </div>

      <ProgressIndicator
        totalSlides={flashcards.length}
        currentIndex={currentIndex}
        onSlideClick={goToSlide}
        isTransitioning={isTransitioning}
        slides={flashcards}
      />

      <audio ref={audioRef} id="audioPlayer" preload="metadata" />

      <ImagePreloader flashcards={flashcards} currentIndex={currentIndex} />
      <FlashcardAnimations />
    </div>
  );
}
