import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-200 text-gray-700">
      <div className="px-6 mx-auto max-w-7xl xl:px-12">
        <div className="flex flex-wrap pt-20 pb-12">

          {/* Column 1: Logo & Tagline */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <Link href="/" className="text-2xl font-bold mb-6 block">
              <span className="text-black">evolve</span>
              <span className="text-red-600">garage</span>
            </Link>
            <p className="text-sm text-gray-600">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Our Services */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="mb-6 font-bold text-xl text-black">{t('servicesTitle')}</h3>
            <ul className="space-y-3">
              <li><Link href="/servicing" className="hover:text-red-600">{t('servicing')}</Link></li>
              <li><Link href="/repairs" className="hover:text-red-600">{t('repairs')}</Link></li>
              <li><Link href="/mot" className="hover:text-red-600">{t('mot')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="mb-6 font-bold text-xl text-black">{t('companyTitle')}</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-red-600">{t('contact')}</Link></li>
              <li><Link href="/forum" className="hover:text-red-600">{t('forum')}</Link></li>
              <li><Link href="/culture" className="hover:text-red-600">{t('culture')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
            <h3 className="mb-6 font-bold text-xl text-black">{t('supportTitle')}</h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="hover:text-red-600">{t('faq')}</Link></li>
              <li><Link href="/feedback" className="hover:text-red-600">{t('feedback')}</Link></li>
              <li><Link href="/chat" className="hover:text-red-600">{t('chat')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full py-8 text-sm border-t border-gray-300">
          <p className="mb-4 md:mb-0 text-gray-600">
            {t('copyright', {year: currentYear})}
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/terms" className="hover:text-red-600">{t('terms')}</Link>
            <Link href="/privacy" className="hover:text-red-600">{t('privacy')}</Link>
            <Link href="/sitemap" className="hover:text-red-600">{t('sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}