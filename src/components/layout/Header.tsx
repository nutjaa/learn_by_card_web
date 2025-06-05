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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <header className="bg-white border-b border-gray-200 print:hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
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
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <LanguageSelector isMobile />
              <ThemeToggle
                isDarkMode={isDarkMode}
                onToggle={toggleTheme}
                isMobile
              />
              <AuthSection
                isMobile
                onMobileMenuClose={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
