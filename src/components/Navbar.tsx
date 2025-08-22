'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import NavItem from './NavItem'; // Import our new component

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // This effect closes dropdowns if you click outside the navbar
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

  return (
    // We add a ref here to detect outside clicks
    <header ref={navRef} className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <nav className="py-3 flex justify-between items-center">
          
          <div className="text-2xl font-bold">
            <Link href="/" onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}>
              <span className="text-black">evolve</span>
              <span className="text-red-600">garage</span>
            </Link>
          </div>

          <div className="hidden md:flex">
            <ul className="flex items-center space-x-6">
              <li><NavItem href="/" text={t('home')} /></li>
              <li><NavItem href="/servicing" text={t('servicing')} hasDropdown onClick={() => handleDropdownToggle('servicing')} /></li>
              <li><NavItem href="/repairs" text={t('repairs')} hasDropdown onClick={() => handleDropdownToggle('repairs')} /></li>
              <li><NavItem href="/mot" text={t('mot')} hasDropdown onClick={() => handleDropdownToggle('mot')} /></li>
              <li><NavItem href="/maintenance" text={t('maintenance')} hasDropdown onClick={() => handleDropdownToggle('maintenance')} /></li>
              <li><NavItem href="/faq" text={t('faq')} hasDropdown onClick={() => handleDropdownToggle('faq')} /></li>
            </ul>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="hover:text-red-600 transition-colors">{t('login')}</Link>
              <Link href="/signup" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">{t('signUp')}</Link>
            </div>
            
            <div className="relative">
              <button title="Change theme" onClick={() => handleDropdownToggle('theme')} className="p-2 rounded-full hover:bg-gray-200 transition-colors">🎨</button>
            </div>
            <div className="relative">
              <button title="Change language" onClick={() => handleDropdownToggle('language')} className="p-2 rounded-full hover:bg-gray-200 transition-colors">🌍</button>
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

        {/* --- Full Width Dropdown Containers --- */}
        {openDropdown && (
          <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200" onClick={() => setOpenDropdown(null)}>
            <div className="container mx-auto px-6 py-8">
              {/* Here we will show the content based on which dropdown is open */}
              {openDropdown === 'servicing' && <div>Content for Car Servicing...</div>}
              {openDropdown === 'repairs' && <div>Content for Car Repairs...</div>}
              {openDropdown === 'mot' && <div>Content for MOT...</div>}
              {openDropdown === 'maintenance' && <div>Content for Maintenance...</div>}
              {openDropdown === 'faq' && <div>Content for FAQ...</div>}
              {openDropdown === 'theme' && <div>Content for Theme Selector...</div>}
              {openDropdown === 'language' && <div>Content for Language Selector...</div>}
            </div>
          </div>
        )}

        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          {/* Mobile menu content remains the same */}
        </div>
      </div>
    </header>
  );
}