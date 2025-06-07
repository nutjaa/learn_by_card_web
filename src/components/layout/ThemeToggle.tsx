'use client';

import { SunIcon, MoonIcon } from '@/components/ui/icons';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export function ThemeToggle({
  isDarkMode,
  onToggle,
  isMobile = false,
}: ThemeToggleProps) {
  if (isMobile) {
    return (
      <button
        onClick={onToggle}
        className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
      title={isDarkMode ? 'Enable light mode' : 'Enable dark mode'}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
