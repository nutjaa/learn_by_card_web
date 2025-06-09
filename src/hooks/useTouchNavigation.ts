import { useState, useCallback } from 'react';

const MIN_SWIPE_DISTANCE = 50;

export function useTouchNavigation(onNext: () => void, onPrev: () => void) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, onNext, onPrev]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
