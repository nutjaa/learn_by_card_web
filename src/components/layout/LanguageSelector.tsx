'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@/components/ui/icons';
import { useLanguagesList } from '@/hooks/useLanguages';
import { Language } from '@/types/language';
import { LoadingSpinner } from '@/components/ui';
import { LanguageBottomSheet } from './LanguageBottomSheet';
import { useBottomSheet } from '@/hooks/useBottomSheet';
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
  const bottomSheet = useBottomSheet();

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

  const formatLanguageName = (lang: Language) => {
    const flag = lang.unicode || '';
    const name = lang.englishName || '';
    const localName = lang.localName;
    return localName && localName !== name
      ? `${flag} ${name} / ${localName}`
      : `${flag} ${name}`;
  };

  const getCurrentLanguage = () => {
    return languages.find(
      (lang) => lang.alpha3?.toString() === currentLanguageCode
    );
  };

  if (isLoading) {
    return (
      <div className={`flex items-center ${className}`}>
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  const languagesToUse =
    error || !languages.length ? hardcodedLanguages : languages;

  if (isMobile) {
    return (
      <>
        {/* Trigger Button */}
        <div className="px-3 py-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Language
          </label>
          <button
            onClick={bottomSheet.open}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span>
              {getCurrentLanguage()
                ? formatLanguageName(getCurrentLanguage()!)
                : 'Select Language'}
            </span>
            <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        {/* Language Bottom Sheet */}
        <LanguageBottomSheet
          isOpen={bottomSheet.isOpen}
          onClose={bottomSheet.close}
          languages={languagesToUse}
          currentLanguageAlpha3={currentLanguageCode}
          onLanguageChange={handleLanguageChange}
          formatLanguageName={formatLanguageName}
        />
      </>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={currentLanguageCode}
      >
        {languagesToUse.map((lang) => (
          <option key={lang.id} value={lang.alpha3?.toString()}>
            {formatLanguageName(lang)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <ChevronDownIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
}

// Hardcoded fallback languages
const hardcodedLanguages = [
  Language.fromJSON({ id: 147, englishName: 'English', unicode: '🇺🇸' }),
];