'use client';

interface ProgressIndicatorProps {
  totalSlides: number;
  currentIndex: number;
  onSlideClick: (index: number) => void;
  isTransitioning: boolean;
}

export function ProgressIndicator({
  totalSlides,
  currentIndex,
  onSlideClick,
  isTransitioning,
}: ProgressIndicatorProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideClick(index)}
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            index === currentIndex
              ? 'bg-white'
              : 'bg-white/50 hover:bg-white/75'
          }`}
          disabled={isTransitioning}
        />
      ))}
    </div>
  );
}
