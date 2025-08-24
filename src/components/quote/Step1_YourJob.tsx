'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useQuoteForm } from '../../context/QuoteContext';
import { services } from '../../data/services';
import CategoriesModal from './CategoriesModal';

const getMockCarDetails = (plate: string) => {
  if (!plate || plate.length < 4) return null;
  return { make: 'Ford', model: 'Fiesta Zetec', details: '998cc' };
};

export default function Step1_YourJob({ onNext, onBack, initialPlate }: { onNext: () => void; onBack: () => void; initialPlate?: string }) {
  // Restore initialPlate parsing from URL
  useEffect(() => {
    if (initialPlate && regPlate === '') {
      setRegPlate(initialPlate);
    }
    // Only set once if field is empty
    // Do not force update after user edits
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlate]);
  const t = useTranslations('QuotePage');
  const { 
    regPlate, setRegPlate, 
    carDetails, setCarDetails, 
    selectedServices, setSelectedServices 
  } = useQuoteForm();
  const [regPlateError, setRegPlateError] = useState('');
  const [serviceError, setServiceError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shakeRegPlate, setShakeRegPlate] = useState(false);
  const [shakeServices, setShakeServices] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (regPlate) {
        setCarDetails(getMockCarDetails(regPlate));
        setRegPlateError('');
      } else {
        setCarDetails(null);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [regPlate, setCarDetails]);

  const filteredServices = useMemo(() => {
    if (!searchTerm) {
      return services.filter(service => [
        'fullServiceMot', 'mot', 'fullService', 'brakes', 'clutchReplacement', 'cambelt'
      ].includes(service.id));
    }
    return services.filter(service => 
      t(service.nameKey).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, t]);

  const handleNextClick = () => {
    setRegPlateError('');
    setServiceError('');
    let isValid = true;
    if (!regPlate.trim()) {
      setRegPlateError(t('regPlateRequiredError'));
      setShakeRegPlate(true);
      isValid = false;
    }
    if (selectedServices.length === 0) {
      setServiceError(t('serviceRequired'));
      setShakeServices(true);
      isValid = false;
    }
    if (isValid) {
      onNext();
    }
  };

  return (
    <>
      <div className="text-center mt-12">
        <h1 className="text-4xl font-extrabold text-gray-900">{t('mainTitle')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('mainSubtitle')}</p>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {/* Car Registration Section */}
        <div 
          onAnimationEnd={() => setShakeRegPlate(false)} 
          className={`bg-gray-50 p-6 rounded-lg border text-center flex flex-col gap-2 ${shakeRegPlate ? 'animate-shake border-red-500' : 'border-gray-200'}`}
        >
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-800">{t('regPlateTitle')}</h2>
            {regPlateError && (
              <span className="ml-2 text-red-500 text-sm font-semibold">{regPlateError}</span>
            )}
          </div>
          <div className={`mt-4 bg-yellow-400 p-1 flex items-center w-full max-w-sm rounded-md border-2 mx-auto ${regPlateError ? 'border-red-500' : 'border-black'}`}>
            <input 
              value={regPlate} 
              onChange={e => setRegPlate(e.target.value.toUpperCase())} 
              className="w-full h-12 bg-yellow-400 text-black text-center text-2xl font-bold uppercase focus:outline-none rounded-md tracking-widest" 
              onFocus={() => setRegPlateError('')} 
              placeholder={t('regPlatePlaceholder')} 
            />
          </div>
          {carDetails && !regPlateError ? (
            <div className="mt-2 flex items-center justify-center text-gray-700">
              <svg className="w-6 h-6 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              <span className="font-semibold">{carDetails.make} {carDetails.model}, {carDetails.details}</span>
            </div>
          ) : <div className="h-[28px] mt-2"></div>}
        </div>

        {/* Service Selection Section */}
        <div 
          onAnimationEnd={() => setShakeServices(false)}
          className={`bg-gray-50 p-6 rounded-lg border flex flex-col gap-2 ${shakeServices ? 'animate-shake border-red-500' : 'border-gray-200'}`}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">{t('servicesTitle')}</h2>
            {serviceError && (
              <span className="text-red-500 text-sm font-semibold">{serviceError}</span>
            )}
          </div>
          <div className="mt-4 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11ZM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9Z" clipRule="evenodd" /></svg>
            </div>
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" className="block w-full rounded-md border-gray-300 pl-10 py-3 focus:border-red-500 focus:ring-red-500" placeholder={t('searchPlaceholder')} />
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <button key={service.id} onClick={() => { setSelectedServices([service.id]); setServiceError(''); }} className={`group flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${selectedServices.includes(service.id) ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-400 hover:bg-red-50'}`}>
                <div className={`transition-colors ${selectedServices.includes(service.id) ? 'text-red-600' : 'text-gray-600 group-hover:text-red-600'}`}>{service.icon}</div>
                <p className={`mt-2 text-sm font-medium text-center transition-colors ${selectedServices.includes(service.id) ? 'text-red-600' : 'text-gray-700 group-hover:text-red-600'}`}>{t(service.nameKey)}</p>
              </button>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => setIsModalOpen(true)} className="font-semibold text-red-600 hover:underline">{t('viewAll')}</button>
          </div>
        </div>
      </div>
  <div className="mt-10 flex flex-row justify-between items-center pb-16">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-6 py-3 border border-gray-300 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span>{t('backButton')}</span>
        </button>
        <button onClick={handleNextClick} className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600">{t('nextButton')}</button>
      </div>
      <CategoriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
        onSelectService={(serviceId: string) => setSelectedServices([serviceId])}
        selectedServices={selectedServices}
      />
    </>
  );
}