'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import NavItem from './NavItem';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // --- This is the new, correct way to manage auth state in a global component ---
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Function to check the current user
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    // Check the user when the component mounts
    checkUser();

    // Set up a listener for auth events (sign in, sign out)
    const hubListener = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          checkUser();
          break;
        case 'signedOut':
          setUser(null);
          break;
      }
    });

    // Cleanup the listener when the component unmounts
    return () => hubListener();
  }, []);
  // --- End of new auth logic ---

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const languages = [ { code: 'en', name: 'English' }, { code: 'gu', name: 'ગુજરાતી' }, { code: 'ro', name: 'Română' }, { code: 'bn', name: 'বাংলা' } ];
  const themes = [ { code: 'uk', name: 'UK Style', flag: '🇬🇧' }, { code: 'sa', name: 'South Asian Style', flag: '🇮🇳' } ];

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
  
  const handleSignOut = () => {
    signOut(); // This now calls the function imported from 'aws-amplify/auth'
    closeAllMenus();
  };

  const getPathWithoutLocale = (path: string) => {
    const pathLocale = path.split('/')[1];
    if (languages.some(l => l.code === pathLocale)) {
      return path.substring(path.indexOf('/', 1));
    }
    return path;
  };
  const cleanPathname = getPathWithoutLocale(pathname);

  const headerClasses = theme === 'sa' ? "bg-orange-50 text-gray-800 shadow-md sticky top-0 z-50" : "bg-white text-gray-800 shadow-md sticky top-0 z-50";

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
            
            {/* The conditional rendering will now work based on our new user state */}
            {user ? (
              // If user is logged in, show Profile dropdown
              <div className="relative">
                <button title={t('profile')} onClick={() => handleDropdownToggle('profile')} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                  </svg>
                </button>
                {openDropdown === 'profile' && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <Link href={`/${locale}/bookings`} onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('myBookings')}</Link>
                    <Link href={`/${locale}/garage`} onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('myVirtualGarage')}</Link>
                    <Link href={`/${locale}/settings`} onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('settings')}</Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button onClick={handleSignOut} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">{t('signOut')}</button>
                  </div>
                )}
              </div>
            ) : (
              // If user is logged out, show Login/Sign Up
              <div className="hidden md:flex items-center space-x-4">
                <Link href={`/${locale}/login`} className="hover:text-red-600 transition-colors">{t('login')}</Link>
                <Link href={`/${locale}/signup`} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">{t('signUp')}</Link>
              </div>
            )}
            
            {/* Theme and Language buttons remain the same */}
            <div className="relative">
              <button title="Change theme" onClick={() => handleDropdownToggle('theme')}>🎨</button>
              {openDropdown === 'theme' && ( <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"> {themes.map((themeItem) => ( <button key={themeItem.code} onClick={() => setTheme(themeItem.code)} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><span>{themeItem.flag}</span><span>{themeItem.name}</span></button>))}</div>)}
            </div>
            
            <div className="relative">
              <button title="Change language" onClick={() => handleDropdownToggle('language')}>🌍</button>
              {openDropdown === 'language' && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">{languages.map((lang) => (<Link key={lang.code} href={`/${lang.code}${cleanPathname}`} onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{lang.name}</Link>))}</div>)}
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none focus:bg-gray-200">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
              </button>
            </div>
          </div>
        </nav>

        {['servicing', 'repairs', 'mot', 'maintenance', 'faq'].includes(openDropdown || '') && ( <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200" onClick={closeAllMenus}><div className="container mx-auto px-6 py-8">{openDropdown === 'servicing' && <div>Content for Car Servicing...</div>}{openDropdown === 'repairs' && <div>Content for Car Repairs...</div>}{openDropdown === 'mot' && <div>Content for MOT...</div>}{openDropdown === 'maintenance' && <div>Content for Maintenance...</div>}{openDropdown === 'faq' && <div>Content for FAQ...</div>}</div></div>)}

        {/* --- Updated Mobile Dropdown Menu --- */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <ul className="flex flex-col items-start space-y-4 pl-4">
            <li><Link href={`/${locale}`} className="hover:text-red-600" onClick={closeAllMenus}>{t('home')}</Link></li>
            <li><Link href={`/${locale}/servicing`} className="hover:text-red-600" onClick={closeAllMenus}>{t('servicing')}</Link></li>
            {/* Add other main links here for mobile */}
            <li className="border-t w-full pt-4">
              {user ? (
                // If logged in, show profile links and sign out
                <div className="flex flex-col items-start space-y-4">
                   <Link href={`/${locale}/bookings`} onClick={closeAllMenus} className="hover:text-red-600">{t('myBookings')}</Link>
                   <Link href={`/${locale}/garage`} onClick={closeAllMenus} className="hover:text-red-600">{t('myVirtualGarage')}</Link>
                   <button onClick={handleSignOut} className="w-full text-left text-red-600 hover:text-red-800">{t('signOut')}</button>
                </div>
              ) : (
                // If logged out, show login/signup
                <div className="flex flex-col items-start space-y-4">
                  <Link href={`/${locale}/login`} className="hover:text-red-600" onClick={closeAllMenus}>{t('login')}</Link>
                  <Link href={`/${locale}/signup`} className="hover:text-red-600" onClick={closeAllMenus}>{t('signUp')}</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}