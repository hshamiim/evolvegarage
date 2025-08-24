'use client';

import { useTranslations } from 'next-intl';
import { useQuoteForm } from '../../context/QuoteContext';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';
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
    setRegPlate,
    selectedSlot,
    setSelectedSlot,
  } = useQuoteForm();

  const [bookingSlots, setBookingSlots] = useState<Array<any>>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);
  const client = generateClient<Schema>();

  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const { data } = await client.models.BookingSlot.list({
          filter: {
            isAvailable: { eq: true },
          },
        });
        setBookingSlots(data);
      } catch (error) {
        console.error('Error fetching booking slots:', error);
      }
      setLoadingSlots(false);
    };
    fetchSlots();
  }, []);

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

      {/* Booking Slot Selection Card */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-800">{t('selectBookingSlot')}</h2>
        <div className="mt-4">
          {loadingSlots ? (
            <div>{t('loadingSlots')}</div>
          ) : bookingSlots.length === 0 ? (
            <div>{t('noSlotsFound')}</div>
          ) : (
            <ul className="space-y-2">
              {bookingSlots.map((slot: any) => (
                <li key={slot.id}>
                  <button
                    className={`w-full text-left p-2 rounded border ${selectedSlot?.id === slot.id ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'} hover:bg-blue-50`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {t('slotFormat', { date: slot.date, startTime: slot.startTime, endTime: slot.endTime })}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {selectedSlot && (
            <div className="mt-4 text-green-600">{t('selectedSlot', { date: selectedSlot.date, startTime: selectedSlot.startTime, endTime: selectedSlot.endTime })}</div>
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
