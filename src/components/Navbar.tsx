'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <nav className="py-3 flex justify-between items-center">
          
          {/* Left Side: Logo with new colors */}
          <div className="text-2xl font-bold">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              {/* Styled "evolve" and "garage" separately for the new theme */}
              <span className="text-black">evolve</span>
              <span className="text-red-600">garage</span>
            </Link>
          </div>

          {/* Middle: Main Navigation Links (Updated hover color) */}
          <div className="hidden md:flex">
            <ul className="flex items-center space-x-6">
              <li><Link href="/" className="hover:text-red-600 transition-colors">{t('home')}</Link></li>
              <li><Link href="/servicing" className="hover:text-red-600 transition-colors">{t('servicing')}</Link></li>
              <li><Link href="/repairs" className="hover:text-red-600 transition-colors">{t('repairs')}</Link></li>
              <li><Link href="/mot" className="hover:text-red-600 transition-colors">{t('mot')}</Link></li>
              <li><Link href="/maintenance" className="hover:text-red-600 transition-colors">{t('maintenance')}</Link></li>
              <li><Link href="/faq" className="hover:text-red-600 transition-colors">{t('faq')}</Link></li>
            </ul>
          </div>

          {/* Right Side: Actions & Controls (Updated button color) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="hover:text-red-600 transition-colors">{t('login')}</Link>
              {/* Updated button to be red */}
              <Link href="/signup" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">{t('signUp')}</Link>
            </div>
            
            <button title="Change theme" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              🎨
            </button>
            <button title="Change language" className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              🌍
            </button>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none focus:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown Menu (Updated hover color) */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <ul className="flex flex-col items-start space-y-4 pl-4">
            <li><Link href="/" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link></li>
            <li><Link href="/servicing" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('servicing')}</Link></li>
            <li><Link href="/repairs" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('repairs')}</Link></li>
            <li><Link href="/mot" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('mot')}</Link></li>
            <li><Link href="/maintenance" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('maintenance')}</Link></li>
            <li><Link href="/faq" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('faq')}</Link></li>
            <li className="border-t w-full pt-4"><Link href="/login" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link></li>
            <li><Link href="/signup" className="hover:text-red-600" onClick={() => setIsMenuOpen(false)}>{t('signUp')}</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}