'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@/components/ui/icons';
import { useLanguagesList } from '@/hooks/useLanguages';
import { Language } from '@/types/language';
import { LoadingSpinner } from '@/components/ui';
import {
  buildUrlWithLanguage,
  getLanguageCodeFromUrl,
} from '@/lib/language-utils';
import { useEffect, useState } from 'react';

interface LanguageSelectorProps {
  className?: string;
  isMobile?: boolean;
}

export function LanguageSelector({
  className = '',
  isMobile = false,
}: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { languages, isLoading, error } = useLanguagesList();
  const [currentLanguageCode, setCurrentLanguageCode] = useState('en');

  // Update current language code when pathname changes
  useEffect(() => {
    setCurrentLanguageCode(getLanguageCodeFromUrl());
  }, [pathname]);

  const handleLanguageChange = (value: string) => {
    const language = languages.find(
      (lang) => lang.alpha3?.toString() === value
    );
    if (language) {
      const newUrl = buildUrlWithLanguage(pathname, language.alpha3 || 'en');
      router.push(newUrl);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (error) {
    console.error('Failed to load languages:', error);
    // Fallback to hardcoded options
    return renderLanguageSelect(
      hardcodedLanguages,
      currentLanguageCode,
      handleLanguageChange,
      isMobile,
      className
    );
  }

  if (!languages.length) {
    // Fallback to hardcoded options
    return renderLanguageSelect(
      hardcodedLanguages,
      currentLanguageCode,
      handleLanguageChange,
      isMobile,
      className
    );
  }

  return renderLanguageSelect(
    languages,
    currentLanguageCode,
    handleLanguageChange,
    isMobile,
    className
  );
}

// Hardcoded fallback languages
const hardcodedLanguages = [
  Language.fromJSON({ id: 147, englishName: 'English', unicode: '🇺🇸' }),
];

function renderLanguageSelect(
  languages: Language[] | typeof hardcodedLanguages,
  currentLanguageAlpha3: string,
  handleLanguageChange: (value: string) => void,
  isMobile: boolean,
  className: string
) {
  const formatLanguageName = (lang: Language) => {
    const flag = lang.unicode || '';
    const name = lang.englishName || '';
    const localName = lang.localName;
    return localName && localName !== name
      ? `${flag} ${name} / ${localName}`
      : `${flag} ${name}`;
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
          value={currentLanguageAlpha3}
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.alpha3?.toString()}>
              {formatLanguageName(lang)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={currentLanguageAlpha3}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.alpha3?.toString()}>
            {formatLanguageName(lang)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}
