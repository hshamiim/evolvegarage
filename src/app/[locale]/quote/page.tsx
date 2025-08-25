'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { QuoteFormProvider } from '../../../context/QuoteContext';
import ProgressBar from '../../../components/quote/MuiProgressBar'; // Assuming you kept this
import Step1_YourJob from '../../../components/quote/Step1_YourJob'; // We will create this next
import Step2_Confirmation from '../../../components/quote/Step2_Confirmation';
import Step3_Confirmation from '../../../components/quote/Step3_Confirmation';

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const t = useTranslations('QuotePage');
  const router = useRouter();
  // Parse registration plate from query param using Next.js useSearchParams
  const searchParams = useSearchParams();
  const initialPlate = searchParams?.get('plate') || '';

  const [nextError, setNextError] = useState('');

  return (
    <QuoteFormProvider>
      <QuotePageInner
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        t={t}
        router={router}
        initialPlate={initialPlate}
        nextError={nextError}
        setNextError={setNextError}
      />
    </QuoteFormProvider>
  );
}

interface QuotePageInnerProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  t: (key: string) => string;
  router: any;
  initialPlate: string;
  nextError: string;
  setNextError: (err: string) => void;
}

function QuotePageInner({ currentStep, setCurrentStep, t, router, initialPlate, nextError, setNextError }: QuotePageInnerProps) {
  const { regPlate, selectedServices } = require('../../../context/QuoteContext').useQuoteForm();
  // Simulate signed-in state for demo; replace with your auth logic
  const isSignedIn = false;

  const handleNext = () => {
    if (!regPlate || regPlate.trim() === '') {
      setNextError(t('regPlateRequiredError'));
      return;
    }
    if (!selectedServices || selectedServices.length === 0) {
      setNextError(t('serviceRequired'));
      return;
    }
    setNextError('');
    setCurrentStep(2);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 flex flex-col h-full justify-center">
          <ProgressBar 
            steps={[t('progressStep1'), t('progressStep2'), t('progressStep3')]} 
            activeStep={currentStep - 1}
          />

          {/* Conditionally render the current step */}
          {currentStep === 1 && (
            <Step1_YourJob
              onNext={handleNext}
              onBack={() => router.back()}
              initialPlate={initialPlate}
            />
          )}
          {currentStep === 2 && (
            <Step2_Confirmation 
              onBack={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
            />
          )}
          {currentStep === 3 && (
            <Step3_Confirmation
              onBack={() => setCurrentStep(2)}
              onConfirm={() => alert('Booking confirmed!')}
              isSignedIn={isSignedIn}
            />
          )}
        </div>
      </div>
    </div>
  );
}