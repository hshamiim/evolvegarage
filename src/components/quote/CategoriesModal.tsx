'use client';

import { useTranslations } from 'next-intl';
import type { Service } from '../../data/services';

type CategoriesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onSelectService: (serviceId: string) => void;
  selectedServices: string[];
};

export default function CategoriesModal({ isOpen, onClose, services, onSelectService, selectedServices }: CategoriesModalProps) {
  if (!isOpen) return null;

  const t = useTranslations('QuotePage');
  const mostPopular = services.filter(s => s.category === 'mostPopular');
  const other = services.filter(s => s.category === 'other');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6 sticky top-0 bg-white border-b z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{t('modalTitle')}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-4">{t('modalMostPopular')}</h3>
          <div className="space-y-3">
            {mostPopular.map(service => (
              <button key={service.id} onClick={() => onSelectService(service.id)} className={`w-full flex justify-between items-center p-4 rounded-lg border text-left transition-colors ${selectedServices.includes(service.id) ? 'bg-red-50 border-red-500' : 'hover:bg-gray-100'}`}>
                <span className="font-medium text-gray-700">{t(service.nameKey)}</span>
                <span className="text-red-500">&rarr;</span>
              </button>
            ))}
          </div>

          <h3 className="font-bold text-lg text-gray-800 mt-8 mb-4">{t('modalOther')}</h3>
          <div className="space-y-3">
            {other.map(service => (
              <button key={service.id} onClick={() => onSelectService(service.id)} className={`w-full flex justify-between items-center p-4 rounded-lg border text-left transition-colors ${selectedServices.includes(service.id) ? 'bg-red-50 border-red-500' : 'hover:bg-gray-100'}`}>
                <span className="font-medium text-gray-700">{t(service.nameKey)}</span>
                <span className="text-red-500">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}