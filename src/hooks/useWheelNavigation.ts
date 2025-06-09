import { useEffect, useRef } from 'react';

const WHEEL_THRESHOLD = 100;
const WHEEL_TIMEOUT = 150;

export function useWheelNavigation(
  containerRef: React.RefObject<HTMLElement | null>,
  onNext: () => void,
  onPrev: () => void
) {
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const now = Date.now();

      // Throttle wheel events
      if (now - lastWheelTimeRef.current < WHEEL_TIMEOUT) {
        return;
      }

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      wheelTimeoutRef.current = setTimeout(() => {
        const delta = event.deltaY;

        if (Math.abs(delta) > WHEEL_THRESHOLD) {
          if (delta > 0) {
            onNext();
          } else {
            onPrev();
          }
          lastWheelTimeRef.current = now;
        }
      }, 50);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [containerRef, onNext, onPrev]);
}
