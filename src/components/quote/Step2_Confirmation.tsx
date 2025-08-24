'use client';

import { useTranslations } from 'next-intl';
import { useQuoteForm } from '../../context/QuoteContext';
import { services } from '../../data/services';
import TextareaAutosize from 'react-textarea-autosize';

interface Step2Props {
  onBack: () => void;
}

export default function Step2_Confirmation({ onBack }: Step2Props) {
  const t = useTranslations('QuotePage');
  const { 
    carDetails, 
    selectedServices, 
    setSelectedServices,
    additionalInfo, 
    setAdditionalInfo,
    setRegPlate 
  } = useQuoteForm();

  // Find the full service objects based on the selected IDs from Step 1
  const selectedServiceDetails = services.filter(service => 
    selectedServices.includes(service.id)
    );

  // Navigation helpers
  // Accept onBack prop to go to step 1
  // Remove direct router.back() usage

  return (
    <div className="mt-12 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">{t('confirmationTitle')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('confirmationSubtitle')}</p>
      </div>

      {/* Quote Overview Card - matches design */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('quoteOverview')}</h2>
        <div className="flex flex-col gap-6">
          {/* Car details row */}
          {carDetails && (
            <div className="flex items-center gap-4">
              {/* Car icon */}
              <svg className="w-10 h-10 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>
              <div>
                <div className="font-bold text-2xl text-gray-800">{carDetails.make} {carDetails.model}, {carDetails.details}</div>
                <button
                  className="mt-1 text-blue-500 text-base font-medium hover:underline text-left"
                  onClick={() => {
                    setRegPlate('');
                    onBack();
                  }}
                >
                  {t('notMyCar') || 'Not my car'}
                </button>
              </div>
            </div>
          )}
          {/* Service row */}
          {selectedServiceDetails.length > 0 && (
            <div className="flex items-center gap-4 mt-4">
              {/* Service icon */}
              <span className="w-10 h-10 flex items-center justify-center text-blue-400">{selectedServiceDetails[0].icon}</span>
              <div>
                <div className="font-bold text-2xl text-gray-800">{t(selectedServiceDetails[0].nameKey)}</div>
                <button
                  className="mt-1 text-blue-500 text-base font-medium hover:underline text-left"
                  onClick={() => {
                    setSelectedServices([]);
                    onBack();
                  }}
                >
                  {t('selectDifferentJob')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information Card */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-800">{t('additionalInfo')}</h2>
        <div className="mt-4 space-y-6">
          <div>
            <label htmlFor="extra-info" className="block text-sm font-medium text-gray-700">{t('additionalInfoSupport')}</label>
            <TextareaAutosize
              id="extra-info"
              minRows={2}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 resize-none"
            />
          </div>
          <div>
            <label htmlFor="additional-work" className="block text-sm font-medium text-gray-700">{t('additionalWork')}</label>
            <TextareaAutosize
              id="additional-work"
              minRows={1}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 resize-none"
            />
            <p className="mt-2 text-xs text-gray-500">{t('additionalWorkSupport')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
