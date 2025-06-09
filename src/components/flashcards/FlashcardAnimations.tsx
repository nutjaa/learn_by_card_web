'use client';

export function FlashcardAnimations() {
  return (
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
        animation: float 4s ease-in-out infinite, rotate 8s ease-in-out infinite;
      }
    `}</style>
  );
}
