'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../providers/LocaleProvider';
import { useGroups } from '../../hooks/useGroups';
import { LoadingSpinner } from '../ui';
import { GroupsResponse } from '../../services';

interface RunningNavbarProps {
  initialData: GroupsResponse | null;
}

export function RunningNavbar({ initialData }: RunningNavbarProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pausedProgress, setPausedProgress] = useState(0);

  const locale = useLocale();

  const { data, isLoading } = useGroups(1, initialData, locale);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Calculate animation duration based on content width
    const contentWidth = marquee.scrollWidth;
    const scrollDistance = contentWidth / 2; // Since we duplicate content
    const duration = scrollDistance / 50; // Adjust speed as needed

    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let progress = (elapsed / (duration * 1000)) % 1;

      // Add the paused progress to continue from where we left off
      progress = (progress + pausedProgress) % 1;

      if (marquee && !isDragging && !isHovered) {
        marquee.scrollLeft = progress * scrollDistance;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [data, isDragging, isHovered, pausedProgress]);

  // Touch/Mouse event handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setHasMoved(false);
    if (marqueeRef.current) {
      setScrollLeft(marqueeRef.current.scrollLeft);
      marqueeRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !marqueeRef.current) return;

    const x = clientX;
    const walk = Math.abs(x - startX);

    // Only start scrolling if moved more than 5px (threshold)
    if (walk > 5) {
      setHasMoved(true);
      const scrollAmount = (x - startX) * 2;
      marqueeRef.current.scrollLeft = scrollLeft - scrollAmount;
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'running';
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only prevent default if not clicking on a link
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseEnter = () => {
    const marquee = marqueeRef.current;
    if (marquee) {
      // Save current progress when pausing
      const contentWidth = marquee.scrollWidth;
      const scrollDistance = contentWidth / 2;
      const currentProgress = marquee.scrollLeft / scrollDistance;
      setPausedProgress(currentProgress % 1);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Handle link clicks
  const handleLinkClick = (e: React.MouseEvent) => {
    // Prevent navigation if user was dragging
    if (hasMoved) {
      e.preventDefault();
    }
  };

  if (!data?.member || data.member.length === 0) {
    return null;
  }

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  const NavList = () => (
    <ul className="navbar-nav flex flex-nowrap">
      {data.member.map((group) => (
        <li key={group.id} className="nav-item flex-shrink-0">
          <Link
            href={`/${locale}/flashcards/${group.id}-${group.getSlug()}`}
            className="nav-link flex items-center px-4 py-2 text-decoration-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-900 dark:text-gray-100"
            onClick={handleLinkClick}
          >
            <span className="nav-link-icon inline-block whitespace-nowrap text-2xl mr-2">
              {group.emoji1}
            </span>
            <span className="nav-link-title whitespace-nowrap text-sm font-medium">
              {group.getNameTranslation()}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full overflow-hidden">
        <div
          ref={marqueeRef}
          className={`flex ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <NavList />
          <NavList />
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .hover\:pause-animation:hover {
          animation-play-state: paused !important;
        }
        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}