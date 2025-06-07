'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { GroupsData } from '../../types/api';
import { useLocale } from '../providers/LocaleProvider';
import { useGroups } from '../../hooks/useGroups';
import { LoadingSpinner } from '../ui';

interface RunningNavbarProps {
  initialData: GroupsData | null;
}

export function RunningNavbar({ initialData }: RunningNavbarProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();

  const { data, isLoading } = useGroups(1, initialData, locale);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Calculate animation duration based on content width
    const contentWidth = marquee.scrollWidth;
    const duration = contentWidth / 100; // Adjust speed as needed

    marquee.style.animationDuration = `${duration}s`;
  }, [data]);

  if (!data?.groups || data.groups.length === 0) {
    return null;
  }

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  const NavList = () => (
    <ul className="navbar-nav flex flex-nowrap">
      {data.groups.map((group) => (
        <li key={group.id} className="nav-item flex-shrink-0">
          <Link
            href={`/${locale}`}
            className="nav-link flex items-center px-4 py-2 text-decoration-none hover:bg-gray-100 rounded-lg transition-colors"
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
    <header className="bg-white border-b border-gray-200">
      <div className="w-full overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex hover:pause-animation"
          style={{
            animation: 'marquee 60s linear infinite',
          }}
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
      `}</style>
    </header>
  );
}
