'use client';

interface NavigationButtonsProps {
  currentIndex: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  isTransitioning: boolean;
}

export function NavigationButtons({
  currentIndex,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  isTransitioning,
}: NavigationButtonsProps) {
  return (
    <>
      {currentIndex > 0 && (
        <button
          onClick={onPrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 rounded-full w-15 h-15 hover:bg-black/70 transition-colors duration-200 flex items-center justify-center text-white text-xl font-bold md:block hidden"
          disabled={isTransitioning}
        >
          ‹
        </button>
      )}

      {currentIndex < totalSlides - 1 && (
        <button
          onClick={onNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 rounded-full w-15 h-15 hover:bg-black/70 transition-colors duration-200 flex items-center justify-center text-white text-xl font-bold md:block hidden"
          disabled={isTransitioning}
        >
          ›
        </button>
      )}
    </>
  );
}
