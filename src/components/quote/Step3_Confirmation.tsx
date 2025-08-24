import { useTranslations } from 'next-intl';
import { services } from '../../data/services';
import { useQuoteForm } from '../../context/QuoteContext';
import { useState, useEffect } from 'react';
import { fetchUserAttributes, fetchAuthSession} from 'aws-amplify/auth';
import Newsletter from '../Newsletter';
import TranslatedAuthenticator from '../TranslatedAuthenticator';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import Step4_Quote from './Step4_Quote';
// This small component can show a greeting when the user signs in on this page
function Greeting({ t, username }: { t: any, username: string | null }) {
  if (!username) return null;
  return (
    <div className="my-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
      {t('greeting', { username })}
    </div>
  );
}
interface Step3Props {
  onBack: () => void;
  onConfirm: () => void;
  isSignedIn: boolean;
}
export default function Step3_Confirmation({ onBack, onConfirm, isSignedIn }: Step3Props) {
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const session = await fetchAuthSession();
        console.log("id token", session.tokens?.idToken);
        console.log("access token", session.tokens?.accessToken);
        setSessionActive(!!session.tokens?.idToken);
        const attributes = await fetchUserAttributes();
        setCurrentUsername(attributes?.preferred_username || attributes?.username || attributes?.sub || null);
      } catch {
        setCurrentUsername(null);
        setSessionActive(false);
      }
    })();
  }, []);
  const t = useTranslations('QuotePage');
  const {
    carDetails,
    selectedServices,
    selectedSlot,
    additionalInfo,
    setRegPlate,
    setSelectedServices,
  } = useQuoteForm();
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // Find the full service objects based on the selected IDs from Step 1
  const selectedServiceDetails = services.filter(service => selectedServices.includes(service.id));

  if (showQuote) {
    return <Step4_Quote onBack={() => setShowQuote(false)} />;
  }

  return (
    <div className="mt-12 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">{t('finalStep')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('finalStepSubtitle')}</p>
      </div>

      {/* Quote Overview Card */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('quoteOverview')}</h2>
        <div className="flex flex-col gap-6">
          {carDetails && (
            <div className="flex items-center gap-4">
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
          {selectedServiceDetails.length > 0 && (
            <div className="flex items-center gap-4 mt-4">
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
          {selectedSlot && (
            <div className="flex items-center gap-4 mt-4">
              <span className="w-10 h-10 flex items-center justify-center text-green-400">
                {/* Calendar icon */}
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>
              </span>
              <div>
                <div className="font-bold text-2xl text-gray-800">
                  {t('slotFormat', { date: selectedSlot.date, startTime: selectedSlot.startTime, endTime: selectedSlot.endTime })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* If not signed in, show TranslatedAuthenticator and newsletter tickbox */}
      {!isSignedIn && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('accountActions')}</h2>
          <Authenticator.Provider>
            <TranslatedAuthenticator initialState="signIn" disableRedirect />
            {/* Show greeting after login using fetched attributes */}
            <Greeting t={t} username={currentUsername} />
          </Authenticator.Provider>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              checked={subscribeNewsletter}
              onChange={e => setSubscribeNewsletter(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="newsletter" className="text-sm text-gray-700">{t('subscribeNewsletter')}</label>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-between mt-8">
        <button
          className="px-6 py-2 rounded border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100"
          onClick={onBack}
        >
          {t('back')}
        </button>
        <button
          className="px-6 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50"
          onClick={() => setShowQuote(true)}
          disabled={!sessionActive}
        >
          {t('getQuotes') || 'Get Quotes'}
        </button>
      </div>
    </div>
  );
}
