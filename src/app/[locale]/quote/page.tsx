'use client';

import { useState, useEffect, useMemo, FC } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { services } from '../../../data/services';
import CategoriesModal from '../../../components/quote/CategoriesModal';
import MuiProgressBar from '../../../components/quote/MuiProgressBar';

// Modern horizontal stepper progress bar
// MUI Progress Bar replaces custom ProgressBar


// Mock function to simulate fetching car details
const getMockCarDetails = (plate: string) => {
  if (!plate || plate.length < 4) return null;
  return { make: 'Ford', model: 'Fiesta Zetec', details: '998cc' };
};

export default function QuotePage() {
  const t = useTranslations('QuotePage');
  const searchParams = useSearchParams();
  const router = useRouter(); // For the back button

  const [regPlate, setRegPlate] = useState(searchParams.get('plate') || '');
  const [carDetails, setCarDetails] = useState<{make: string, model: string, details: string} | null>(null);
  const [regPlateError, setRegPlateError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (regPlate) {
        setCarDetails(getMockCarDetails(regPlate));
        setRegPlateError(''); // Clear error if user is typing
      } else {
        setCarDetails(null);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [regPlate]);
  
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };
  
  const filteredServices = useMemo(() => {
    if (!searchTerm) return services.slice(0, 6);
    return services.filter(service => 
      t(service.nameKey).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, t]);

  const handleReset = () => {
    setRegPlate('');
    setRegPlateError('');
    setSearchTerm('');
    setSelectedServices([]);
  };

  const handleNext = () => {
    if (!regPlate.trim()) {
      setRegPlateError(t('regPlateRequiredError'));
      return;
    }
    // Logic to go to the next step will be added here
    console.log("Proceeding to next step with:", { regPlate, selectedServices });
  };


  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        
        <MuiProgressBar 
          steps={[t('progressStep1'), t('progressStep2'), t('progressStep3')]} 
          activeStep={0} 
        />

        <div className="text-center mt-20">
          <h1 className="text-4xl font-extrabold text-gray-900">{t('mainTitle')}</h1>
          <p className="mt-4 text-lg text-gray-600">{t('mainSubtitle')}</p>
        </div>

        <div className="mt-8 space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border text-center">
            <h2 className="text-lg font-semibold text-gray-800">{t('regPlateTitle')}</h2>
            {/* Added mx-auto to center the box, and conditional animation class */}
            <div className={`mt-4 bg-yellow-400 p-2 flex items-center w-full max-w-sm rounded-md border-2 mx-auto transition-all duration-150 ${regPlateError ? 'border-red-500 animate-shake' : 'border-black'}`}>
              <input 
                value={regPlate} 
                onChange={e => setRegPlate(e.target.value.toUpperCase())} 
                className={`flex-grow h-12 bg-yellow-400 text-black text-center text-2xl font-bold uppercase focus:outline-none ${regPlateError ? 'ring-2 ring-red-500 animate-shake' : ''}`}
                placeholder={t('regPlatePlaceholder')}
                onAnimationEnd={e => e.currentTarget.classList.remove('animate-shake')}
              />
            </div>
            {regPlateError ? (
              <p className="mt-2 text-sm text-red-600">{regPlateError}</p>
            ) : carDetails ? (
              <div className="mt-2 flex items-center justify-center text-gray-700">
                <svg className="w-6 h-6 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-6.75 3h9m-9 3h4.5m.75-12.25-1.5-1.5M6 12l-1.5-1.5m1.5 1.5 1.5 1.5M10.5 6.75l-1.5-1.5L8.25 7.5l-1.5-1.5L6 6.75l-1.5-1.5l1.5-1.5l1.5 1.5l1.5-1.5l1.5 1.5ZM10.5 15l-1.5-1.5L8.25 15l-1.5-1.5L6 15l-1.5-1.5l1.5-1.5l1.5 1.5l1.5-1.5l1.5 1.5Z" /></svg>
                <span>{carDetails.make} {carDetails.model}, {carDetails.details}</span>
              </div>
            ) : null}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border">
            {/* Service selector content remains the same */}
            <h2 className="text-lg font-semibold text-gray-800">{t('servicesTitle')}</h2>
            <div className="mt-4 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11ZM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9Z" clipRule="evenodd" /></svg>
              </div>
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" className="block w-full rounded-md border-gray-300 pl-10 py-3 focus:border-red-500 focus:ring-red-500" placeholder={t('searchPlaceholder')} />
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredServices.map((service) => (
                <button key={service.id} onClick={() => handleServiceSelect(service.id)} className={`group flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-colors ${selectedServices.includes(service.id) ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-400 hover:bg-red-50'}`}>
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

        <div className="mt-10 flex justify-between items-center">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            <span>{t('backButton')}</span>
          </button>
          <button onClick={handleReset} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9a9 9 0 0114.65-5.65M20 15a9 9 0 01-14.65 5.65"></path></svg>
            <span>{t('resetButton')}</span>
          </button>
          <button onClick={handleNext} className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600">
            {t('nextButton')}
          </button>
        </div>
      </div>
      
      <CategoriesModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={services}
        onSelectService={handleServiceSelect}
        selectedServices={selectedServices}
      />
    </div>
  );
}