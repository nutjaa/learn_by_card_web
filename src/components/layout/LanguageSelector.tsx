'use client';

import { ChevronDownIcon } from '@/components/ui/icons';

interface LanguageSelectorProps {
  className?: string;
  isMobile?: boolean;
}

export function LanguageSelector({
  className = '',
  isMobile = false,
}: LanguageSelectorProps) {
  const handleLanguageChange = (value: string) => {
    console.log('Language changed to:', value);
    // Handle language change logic
  };

  if (isMobile) {
    return (
      <div className="px-3 py-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleLanguageChange(e.target.value)}
          defaultValue="147"
        >
          <option value="147">🇺🇸 English</option>
          <option value="160">🇫🇮 Finnish / Suomi</option>
          <option value="332">🇲🇾 Malay / Melayu</option>
          <option value="557">🇹🇭 Thai / ไทย</option>
        </select>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => handleLanguageChange(e.target.value)}
        defaultValue="147"
      >
        <option value="147">🇺🇸 English</option>
        <option value="160">🇫🇮 Finnish / Suomi</option>
        <option value="332">🇲🇾 Malay / Melayu</option>
        <option value="557">🇹🇭 Thai / ไทย</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}
