'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const router = useRouter();

  const [regPlate, setRegPlate] = useState('');

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPlate.trim()) {
      router.push(`/${locale}/quote?plate=${regPlate.toUpperCase().replace(/\s/g, '')}`);
    }
  };

  return (
    // Ensure this class is set to h-screen
<section className="relative w-full h-[80vh] text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-shadow-md">
          {t('title')}
        </h1>
        <p className="max-w-3xl md:text-lg mb-8 text-shadow">
          {t('subtitle')}
        </p>

        <form onSubmit={handleGetQuote} className="flex flex-col items-center gap-4 w-full max-w-md">
          <div className="bg-yellow-400 flex items-center w-full max-w-sm rounded-md border-2 border-black overflow-hidden">
            <div className="bg-blue-600 h-full flex flex-col justify-center items-center px-3 self-stretch">
              <span className="text-white font-bold text-sm">GB</span>
            </div>
            <input 
              type="text"
              value={regPlate}
              onChange={(e) => setRegPlate(e.target.value)}
              placeholder={t('regPlatePlaceholder')}
              className="w-full bg-transparent text-black text-center text-2xl md:text-3xl font-bold uppercase tracking-wider placeholder-gray-800/70 focus:outline-none py-3"
            />
          </div>
          
          <button 
            type="submit"
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            {t('getQuoteButton')}
          </button>
        </form>
      </div>
    </section>
  );
}