import { useState, useCallback } from 'react';

export function useFlashcardNavigation(
  totalSlides: number,
  onSlideChange?: (index: number) => void
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides || isTransitioning) return;

      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(index);
        onSlideChange?.(index);
        setTimeout(() => setIsTransitioning(false), 150);
      }, 50);
    },
    [totalSlides, isTransitioning, onSlideChange]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  return {
    currentIndex,
    isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
  };
}
