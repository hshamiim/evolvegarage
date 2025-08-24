'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useQuoteForm } from '../../context/QuoteContext';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/bn';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';
import { services } from '../../data/services';
import TextareaAutosize from 'react-textarea-autosize';

interface Step2Props {
  onBack: () => void;
  onNext: () => void;
}

// Helper to convert numbers to Bengali numerals
function toBengaliNumerals(str: string): string {
  const bengaliDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return str.replace(/\d/g, d => bengaliDigits[parseInt(d)]);
}

export default function Step2_Confirmation({ onBack, onNext }: Step2Props) {

  const t = useTranslations('QuotePage');
  const locale = useLocale();
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
  // Set initial selected date to today
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  // ...existing code...
  const client = generateClient<Schema>();

  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const { data } = await client.models.BookingSlot.list({
          filter: {
            date: { eq: selectedDate.locale(locale === 'bn' ? 'bn' : 'en').format('YYYY-MM-DD') },
          },
        });
        setBookingSlots(data);
      } catch (error) {
        console.error('Error fetching booking slots:', error);
      }
      setLoadingSlots(false);
    };
    fetchSlots();
  }, [selectedDate, locale]);

  // Find the full service objects based on the selected IDs from Step 1
  const selectedServiceDetails = services.filter(service => 
    selectedServices.includes(service.id)
  );

  // Helper to generate slots for a given date and service duration
  type Slot = { startTime: string; endTime: string; date: string };
  function generateSlots(date: Date, serviceDuration: number): Slot[] {
    const slots: Slot[] = [];
    const day = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    let startHour: number, endHour: number;

    if (day >= 1 && day <= 5) { // Mon-Fri
      startHour = 9.5; // 9:30
      endHour = 17.5;  // 17:30
    } else if (day === 6) { // Sat
      startHour = 10.5; // 10:30
      endHour = 16.5;   // 16:30
    } else {
      return slots; // No slots on Sunday
    }

    for (let hour = startHour; hour <= endHour - serviceDuration; hour += 1) {
      const start = new Date(date);
      start.setHours(Math.floor(hour), (hour % 1) * 60, 0, 0);
      const end = new Date(start);
      end.setHours(start.getHours() + serviceDuration);

      // Format time and date for display
      let startTime = start.toTimeString().slice(0, 5);
      let endTime = end.toTimeString().slice(0, 5);
      let slotDate = start.toISOString().slice(0, 10);

      // Only convert to Bengali numerals for display, keep slotDate in standard format for logic
      if (locale === 'bn') {
        startTime = toBengaliNumerals(startTime);
        endTime = toBengaliNumerals(endTime);
      }

      slots.push({
        startTime,
        endTime,
        date: slotDate,
      });
    }
    return slots;
  }

  // Get duration from selected service (default 1 hour)
  const serviceDuration =
    selectedServiceDetails.length > 0 && 'duration' in selectedServiceDetails[0]
      ? (selectedServiceDetails[0] as any).duration ?? 1
      : 1;

  // Generate all possible slots for the selected date
  const allSlots = generateSlots(selectedDate.toDate(), serviceDuration);

  // Filter out booked slots
  const availableSlots = allSlots.filter(slot => {
    return !bookingSlots.some(
      booked =>
        booked.date === slot.date &&
        booked.startTime === slot.startTime &&
        booked.endTime === slot.endTime
    );
  });

  // After availableSlots is computed, auto-select closest available booking date
  useEffect(() => {
    if (availableSlots.length > 0) {
      const dates = availableSlots.map(slot => dayjs(slot.date, 'YYYY-MM-DD'));
      const closest = dates.reduce((a, b) => (a.isBefore(b) ? a : b));
      if (!selectedDate.isSame(closest, 'day')) {
        setSelectedDate(closest);
      }
    }
  }, [availableSlots]);

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
              <svg className="w-10 h-10 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>
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
              <span className="w-10 h-10 flex items-center justify-center text-red-400">{selectedServiceDetails[0].icon}</span>
              <div>
                <div className="font-bold text-2xl text-gray-800">{t(selectedServiceDetails[0].nameKey)}</div>
                <button
                  className="mt-1 text-red-500 text-base font-medium hover:underline text-left"
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
        <div className="mt-4 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <label className="block mb-2 font-medium">{t('selectDate')}</label>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale === 'bn' ? 'bn' : 'en'}>
              {/* Custom styled DateCalendar for red selected date */}
              {(() => {
                const RedDateCalendar = styled(DateCalendar)(({ theme }) => ({
                  '& .MuiPickersDay-root.Mui-selected': {
                    backgroundColor: '#ef4444', // red-500
                    color: '#fff',
                  },
                  '& .MuiPickersDay-root.Mui-selected:hover': {
                    backgroundColor: '#dc2626', // red-700
                  },
                }));
                return (
                  <RedDateCalendar
                    value={selectedDate}
                    onChange={date => setSelectedDate(date as Dayjs)}
                    disablePast
                    shouldDisableDate={date => date.day() === 0}
                    // Format day numbers for Bengali
                    slots={{
                      day: (props) => {
                        let label = String(props.day.date());
                        if (locale === 'bn') label = toBengaliNumerals(label);
                        return <PickersDay {...props} children={label} />;
                      },
                    }}
                  />
                );
              })()}
            </LocalizationProvider>
          </div>
          <div className="md:w-1/2">
            <label className="block mb-2 font-medium">{t('availableSlots')}</label>
            {loadingSlots ? (
              <div>{t('loadingSlots')}</div>
            ) : availableSlots.length === 0 ? (
              <div>{t('noSlotsFound')}</div>
            ) : (
              <ul className="space-y-2">
                {availableSlots.map((slot: any) => (
                  <li key={slot.startTime + slot.endTime}>
                    <button
                      className={`w-full text-left p-2 rounded border ${selectedSlot?.startTime === slot.startTime ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300'} hover:bg-red-50`}
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

      {/* Action buttons below the card, Back left, Continue right, with padding below */}
      <div className="flex justify-between items-center mt-8 pb-12">
        <button
          className="px-6 py-2 rounded border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100"
          onClick={onBack}
        >
          {t('back')}
        </button>
        <button
          className="px-6 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600"
          onClick={onNext}
        >
          {t('continue')}
        </button>
      </div>
    </div>
  );
}
