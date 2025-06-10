'use client';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Language } from '@/types/language';

interface LanguageBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  languages: Language[];
  currentLanguageAlpha3: string;
  onLanguageChange: (value: string) => void;
  formatLanguageName: (lang: Language) => string;
}

export function LanguageBottomSheet({
  isOpen,
  onClose,
  languages,
  currentLanguageAlpha3,
  onLanguageChange,
  formatLanguageName,
}: LanguageBottomSheetProps) {
  const handleLanguageSelect = (alpha3: string) => {
    onLanguageChange(alpha3);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Language">
      <div className="py-2">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleLanguageSelect(lang.alpha3?.toString() || '')}
            className={`w-full px-4 py-3 text-left transition-colors flex items-center justify-between ${
              lang.alpha3?.toString() === currentLanguageAlpha3
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700'
            }`}
          >
            <span className="text-sm">{formatLanguageName(lang)}</span>
            {lang.alpha3?.toString() === currentLanguageAlpha3 && (
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}