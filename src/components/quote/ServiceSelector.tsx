import { getTranslations } from 'next-intl/server';
import { services } from '../../data/services';

export default async function ServiceSelector() {
  const t = await getTranslations('QuotePage');

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-gray-800">{t('servicesTitle')}</h2>
      
      {/* Search Bar (will make functional later) */}
      <div className="mt-4 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11ZM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9Z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 pl-10 py-3 focus:border-red-500 focus:ring-red-500"
          placeholder={t('searchPlaceholder')}
        />
      </div>

      {/* Service Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {services.map((service) => (
          <button key={service.id} className="group flex flex-col items-center justify-center p-4 border rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <div className="text-gray-600 group-hover:text-red-600">
              {service.icon}
            </div>
            <p className="mt-2 text-sm font-medium text-center text-gray-700 group-hover:text-red-600">
              {t(service.nameKey)}
            </p>
          </button>
        ))}
      </div>

      {/* View All Button (will make functional later) */}
      <div className="mt-6 text-center">
        <button className="font-semibold text-red-600 hover:underline">
          {t('viewAll')}
        </button>
      </div>
    </div>
  );
}