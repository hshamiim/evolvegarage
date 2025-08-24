import { useTranslations } from 'next-intl';

interface ProgressBarProps {
  currentStep?: number;
}

export default function ProgressBar({ currentStep = 1 }: ProgressBarProps) {
  const t = useTranslations('QuotePage');
  const steps = [
    { id: 1, name: t('progressStep1') },
    { id: 2, name: t('progressStep2') },
    { id: 3, name: t('progressStep3') },
  ];

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {step.id <= currentStep ? (
              // Completed Step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-red-600" />
                </div>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-600">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="absolute top-10 text-center w-full text-xs sm:text-sm font-semibold text-red-600">{step.name}</span>
              </>
            ) : (
              // Upcoming Step
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                </span>
                <span className="absolute top-10 text-center w-full text-xs sm:text-sm font-semibold text-red-600">{step.name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}