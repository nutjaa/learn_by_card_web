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
      <div className="px-3 py-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Theme
        </label>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md transition-colors"
        >
          <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          {isDarkMode ? (
            <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <SunIcon className="w-5 h-5 text-amber-500" />
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onToggle}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
      title={isDarkMode ? 'Enable light mode' : 'Enable dark mode'}
    >
      {isDarkMode ? (
        <MoonIcon className="w-5 h-5 text-blue-500" />
      ) : (
        <SunIcon className="w-5 h-5 text-amber-500" />
      )}
    </button>
  );
}