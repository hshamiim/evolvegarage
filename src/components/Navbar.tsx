'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'ro', name: 'Română' },
    { code: 'bn', name: 'বাংলা' },
  ];

  // Effect to close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navRef]);

  // Function to toggle dropdowns, ensuring only one is open
  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Function to close all menus, used when navigating
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Helper to get the current path without the language code
  const getPathWithoutLocale = (path: string) => {
    const pathLocale = path.split('/')[1];
    if (languages.some(l => l.code === pathLocale)) {
      return path.substring(path.indexOf('/', 1));
    }
    return path;
  };
  const cleanPathname = getPathWithoutLocale(pathname);

  return (
    <header ref={navRef} className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
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
              <button title="Change theme" onClick={() => handleDropdownToggle('theme')} className="p-2 rounded-full hover:bg-gray-200 transition-colors">🎨</button>
              {openDropdown === 'theme' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <a href="#" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Default Theme</a>
                  <a href="#" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">UK Style</a>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button title="Change language" onClick={() => handleDropdownToggle('language')} className="p-2 rounded-full hover:bg-gray-200 transition-colors">🌍</button>
              {openDropdown === 'language' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  {languages.map((lang) => (
                    <Link 
                      key={lang.code}
                      href={`/${lang.code}${cleanPathname}`}
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

        {/* --- Full Width Dropdown Container --- */}
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

        {/* Mobile Dropdown Menu */}
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