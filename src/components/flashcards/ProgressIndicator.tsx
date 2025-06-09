'use client';

import { Flashcard } from '../../types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ProgressIndicatorProps {
  totalSlides: number;
  currentIndex: number;
  onSlideClick: (index: number) => void;
  isTransitioning: boolean;
  slides: Flashcard[];
}

export function ProgressIndicator({
  totalSlides,
  currentIndex,
  onSlideClick,
  isTransitioning,
  slides,
}: ProgressIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeButtonRef.current && containerRef.current) {
      activeButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 max-w-[80vw] overflow-x-auto scrollbar-hide px-4"
    >
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          ref={index === currentIndex ? activeButtonRef : null}
          onClick={() => onSlideClick(index)}
          className={`relative w-12 h-8 rounded transition-all duration-200 overflow-hidden border-2 flex-shrink-0 ${
            index === currentIndex
              ? 'border-white shadow-lg scale-110'
              : 'border-white/50 hover:border-white/75 hover:scale-105'
          }`}
          disabled={isTransitioning}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {slides[index]?.optimizedImageUrl || slides[index]?.imageUrl ? (
            <Image
              src={
                (slides[index]?.optimizedImageUrl || slides[index]?.imageUrl)!
              }
              alt={slides[index].name || `Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
              {index + 1}
            </div>
          )}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-200 ${
              index === currentIndex ? 'opacity-0' : 'opacity-20'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
