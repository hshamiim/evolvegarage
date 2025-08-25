
import { useTranslations } from 'next-intl';
import { useQuoteForm } from '../../context/QuoteContext';
import { services } from '../../data/services';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from 'amplify/data/resource';
import React from 'react';

interface Step4Props {
  onBack: () => void;
  userId?: string | null;
}
export default function Step4_Quote({ onBack, userId }: Step4Props) {

  const t = useTranslations('QuotePage');
  const { carDetails, selectedServices, selectedSlot, additionalInfo, regPlate } = useQuoteForm();
  const selectedServiceDetails = services.filter(service => selectedServices.includes(service.id));
  const client = generateClient<Schema>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  // Get userId from props

  // Placeholder price
  const quotePrice = '£99.00';

  // Get locale from URL (e.g. /en, /bn, /ro)
  let locale = 'en';
  if (typeof window !== 'undefined') {
    const match = window.location.pathname.match(/^\/([a-zA-Z-]+)/);
    if (match && match[1]) {
      locale = match[1];
    }
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=Evolve%20Garage%2C%20Gwendolen%20Road%2C%20Leicester%2C%20UK&zoom=15&maptype=roadmap&language=${locale}`;

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await client.models.Booking.create({
        registrationPlate: regPlate,
        service: selectedServiceDetails.map(s => s.nameKey).join(', '),
        date: selectedSlot?.date || '',
        notes: additionalInfo || '',
userId: userId || '',        quote: quotePrice,
        confirmed: true,
        finished: false,
        cancelled: false,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      {/* Only show quote price and subtitle, no stepper here */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-red-600">{quotePrice}</h1>
        <p className="mt-2 text-lg text-gray-700">{t('quotePriceSubtitle') || 'Estimated price for your selected services'}</p>
      </div>

      {/* Summary Card */}
      <div className="bg-gray-50 p-6 rounded-lg border border-red-300">
        <h2 className="text-lg font-semibold text-red-700 mb-4">{t('quoteSummary') || 'Quote Summary'}</h2>
        <div className="flex flex-col gap-4">
          {carDetails && (
            <div>
              <span className="font-bold text-gray-800">{carDetails.make} {carDetails.model}</span>
              <span className="ml-2 text-gray-600">{carDetails.details}</span>
            </div>
          )}
          {selectedServiceDetails.length > 0 && (
            <div>
              <span className="font-bold text-gray-800">{t(selectedServiceDetails[0].nameKey)}</span>
            </div>
          )}
          {selectedSlot && (
            <div>
              <span className="font-bold text-gray-800">{t('slotFormat', { date: selectedSlot.date, startTime: selectedSlot.startTime, endTime: selectedSlot.endTime })}</span>
            </div>
          )}
          {additionalInfo && (
            <div>
              <span className="font-bold text-gray-800">{t('additionalInfo') || 'Additional Info'}:</span>
              <span className="ml-2 text-gray-600">{additionalInfo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-red-700 mb-2">{t('location') || 'Business Location'}</h2>
        <iframe
          width="100%"
          height="380px"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapSrc}
          allowFullScreen
        ></iframe>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 pb-12">
        <button
          className="px-6 py-2 rounded border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100"
          onClick={onBack}
          disabled={loading}
        >
          {t('back')}
        </button>
        <button
          className="px-6 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? t('confirming') : t('confirmBooking')}
        </button>
      </div>
      {error && (
        <div className="text-red-600 font-semibold text-center mt-4">{error}</div>
      )}
      {success && (
        <div className="text-green-600 font-semibold text-center mt-4">{t('bookingSuccess') || 'Booking confirmed!'}</div>
      )}
    </div>
  );
}
