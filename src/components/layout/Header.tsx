'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { APP_CONFIG } from '@/lib/constants';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { AuthSection } from './AuthSection';
import { MenuIcon, CloseIcon } from '@/components/ui/icons';
import styles from './Header.module.css';
import { useTheme } from 'next-themes';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 print:hidden">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                }`}
              >
                <MenuIcon />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                }`}
              >
                <CloseIcon />
              </div>
            </div>
          </button>

          {/* Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/icon-512.png"
                alt={APP_CONFIG.name}
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span
                className={`text-xl hidden sm:block ${styles.gradientText}`}
              >
                {APP_CONFIG.name}
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            <AuthSection />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
            <div
              className={`transform transition-all duration-300 ease-in-out delay-75 ${
                isMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-4 opacity-0'
              }`}
            >
              <LanguageSelector isMobile />
            </div>
            <div
              className={`transform transition-all duration-300 ease-in-out delay-100 ${
                isMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-4 opacity-0'
              }`}
            >
              <ThemeToggle
                isDarkMode={isDarkMode}
                onToggle={toggleTheme}
                isMobile
              />
            </div>
            <div
              className={`transform transition-all duration-300 ease-in-out delay-150 ${
                isMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-4 opacity-0'
              }`}
            >
              <AuthSection
                isMobile
                onMobileMenuClose={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}