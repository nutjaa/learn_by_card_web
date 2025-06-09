'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@/components/ui/icons';
import { useLanguagesList } from '@/hooks/useLanguages';
import { Language } from '@/types/language';
import { LoadingSpinner } from '@/components/ui';
import { Portal } from '@/components/ui/Portal';
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update current language code when pathname changes
  useEffect(() => {
    setCurrentLanguageCode(getLanguageCodeFromUrl());
  }, [pathname]);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
    setIsAnimating(true);
  };

  const handleCloseBottomSheet = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsBottomSheetOpen(false);
    }, 300); // Match the animation duration
  };

  const handleLanguageChange = (value: string) => {
    const language = languages.find(
      (lang) => lang.alpha3?.toString() === value
    );
    if (language) {
      const newUrl = buildUrlWithLanguage(pathname, language.alpha3 || 'en');
      router.push(newUrl);
      handleCloseBottomSheet();
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
    className,
    isBottomSheetOpen,
    handleOpenBottomSheet,
    handleCloseBottomSheet,
    isAnimating
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
  className: string,
  isBottomSheetOpen?: boolean,
  handleOpenBottomSheet?: () => void,
  handleCloseBottomSheet?: () => void,
  isAnimating?: boolean
) {
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
      (lang) => lang.alpha3?.toString() === currentLanguageAlpha3
    );
  };

  if (isMobile) {
    return (
      <>
        {/* Trigger Button */}
        <div className="px-3 py-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <button
            onClick={handleOpenBottomSheet}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between"
          >
            <span>
              {getCurrentLanguage()
                ? formatLanguageName(getCurrentLanguage()!)
                : 'Select Language'}
            </span>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Bottom Sheet Overlay - Rendered in Portal */}
        {isBottomSheetOpen && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-end">
              {/* Backdrop */}
              <div
                className={`absolute inset-0 backdrop-blur-sm transition-all duration-300 ease-out ${
                  isAnimating
                    ? 'bg-black/20 opacity-100'
                    : 'bg-transparent opacity-0'
                }`}
                onClick={handleCloseBottomSheet}
              />

              {/* Bottom Sheet */}
              <div
                className={`relative w-full bg-white rounded-t-2xl shadow-xl max-h-[70vh] overflow-hidden transform transition-all duration-300 ease-out ${
                  isAnimating
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
              >
                {/* Handle */}
                <div className="flex justify-center py-3">
                  <div className="w-8 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-4 pb-2 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select Language
                  </h3>
                </div>

                {/* Language List */}
                <div className="overflow-y-auto max-h-[calc(70vh-5rem)]">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() =>
                        handleLanguageChange(lang.alpha3?.toString() || '')
                      }
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-between ${
                        lang.alpha3?.toString() === currentLanguageAlpha3
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-900'
                      }`}
                    >
                      <span className="text-sm">
                        {formatLanguageName(lang)}
                      </span>
                      {lang.alpha3?.toString() === currentLanguageAlpha3 && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>
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
