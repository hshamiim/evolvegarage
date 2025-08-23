'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ro', name: 'Română' },
    { code: 'bn', name: 'বাংলা' },
  ];

  const themes = [
    { code: 'uk', name: 'UK Style', flag: '🇬🇧' },
    { code: 'sa', name: 'South Asian Style', flag: '🇮🇳' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navRef]);


  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleThemeChange = (themeCode: string) => {
    setTheme(themeCode);
    closeAllMenus();
  }

  // --- FIX for language URL ---
  // Get the current path without the language code
  const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
    ? pathname.slice(locale.length + 1) || '/' 
    : pathname;

  // Example of how the theme can change styles
  const headerClasses = theme === 'sa' 
    ? "bg-orange-50 text-gray-800 shadow-md sticky top-0 z-50" 
    : "bg-white text-gray-800 shadow-md sticky top-0 z-50";


  return (
    <header ref={navRef} className={headerClasses}>
      <div className="container mx-auto px-6">
        <nav className="py-3 flex justify-between items-center">
          
          <div className="text-2xl font-bold">
            <Link href={`/${locale}`} onClick={closeAllMenus}>
              <span className="text-black">evolve</span>
              <span className="text-red-600">garage</span>
            </Link>
          </div>

          <div className="hidden md:flex">
             <ul className="flex items-center space-x-6">
               <li><NavItem href={`/${locale}`} text={t('home')} /></li>
               <li><NavItem href="#" text={t('servicing')} hasDropdown onClick={() => handleDropdownToggle('servicing')} /></li>
               <li><NavItem href="#" text={t('repairs')} hasDropdown onClick={() => handleDropdownToggle('repairs')} /></li>
               <li><NavItem href="#" text={t('mot')} hasDropdown onClick={() => handleDropdownToggle('mot')} /></li>
               <li><NavItem href="#" text={t('maintenance')} hasDropdown onClick={() => handleDropdownToggle('maintenance')} /></li>
               <li><NavItem href="#" text={t('faq')} hasDropdown onClick={() => handleDropdownToggle('faq')} /></li>
             </ul>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link href={`/${locale}/login`} className="hover:text-red-600 transition-colors">{t('login')}</Link>
              <Link href={`/${locale}/signup`} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">{t('signUp')}</Link>
            </div>
            
            <div className="relative">
              <button title="Change theme" onClick={() => handleDropdownToggle('theme')}>🎨</button>
              {openDropdown === 'theme' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {themes.map((themeItem) => (
                    <button 
                      key={themeItem.code}
                      onClick={() => handleThemeChange(themeItem.code)} 
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span>{themeItem.flag}</span>
                      <span>{themeItem.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button title="Change language" onClick={() => handleDropdownToggle('language')}>🌍</button>
              {openDropdown === 'language' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <Link 
                      key={lang.code}
                      href={`/${lang.code}${pathWithoutLocale}`}
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {lang.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none focus:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {['servicing', 'repairs', 'mot', 'maintenance', 'faq'].includes(openDropdown || '') && (
          <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200" onClick={closeAllMenus}>
            <div className="container mx-auto px-6 py-8">
              {openDropdown === 'servicing' && <div>Content for Car Servicing...</div>}
              {openDropdown === 'repairs' && <div>Content for Car Repairs...</div>}
              {openDropdown === 'mot' && <div>Content for MOT...</div>}
              {openDropdown === 'maintenance' && <div>Content for Maintenance...</div>}
              {openDropdown === 'faq' && <div>Content for FAQ...</div>}
            </div>
          </div>
        )}

        {/* --- FIX: Restored Mobile Dropdown Menu Content --- */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <ul className="flex flex-col items-start space-y-4 pl-4">
            <li><Link href={`/${locale}`} className="hover:text-red-600" onClick={closeAllMenus}>{t('home')}</Link></li>
            <li><Link href={`/${locale}/servicing`} className="hover:text-red-600" onClick={closeAllMenus}>{t('servicing')}</Link></li>
            <li><Link href={`/${locale}/repairs`} className="hover:text-red-600" onClick={closeAllMenus}>{t('repairs')}</Link></li>
            <li><Link href={`/${locale}/mot`} className="hover:text-red-600" onClick={closeAllMenus}>{t('mot')}</Link></li>
            <li><Link href={`/${locale}/maintenance`} className="hover:text-red-600" onClick={closeAllMenus}>{t('maintenance')}</Link></li>
            <li><Link href={`/${locale}/faq`} className="hover:text-red-600" onClick={closeAllMenus}>{t('faq')}</Link></li>
            <li className="border-t w-full pt-4"><Link href={`/${locale}/login`} className="hover:text-red-600" onClick={closeAllMenus}>{t('login')}</Link></li>
            <li><Link href={`/${locale}/signup`} className="hover:text-red-600" onClick={closeAllMenus}>{t('signUp')}</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
}