'use client'; // This directive makes it a Client Component

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// The Step component can stay the same, but we'll move its definition here
const Step = ({ title, heading, text, icon }: { title: string, heading: string, text: string, icon: JSX.Element }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-500 text-white">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-500">{title}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">{heading}</p>
        <p className="mt-1 text-base text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');
  // State to track which step is being hovered, defaulting to step 1
  const [hoveredStep, setHoveredStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>,
      titleKey: "step1_title",
      headingKey: "step1_heading",
      textKey: "step1_text",
    },
    {
      id: 2,
      // Updated icon for Step 2 (magnifier with a price tag)
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 11l2 2m0 0l2-2m-2 2v-4m0 4h.01"></path></svg>,
      titleKey: "step2_title",
      headingKey: "step2_heading",
      textKey: "step2_text",
    },
    {
      id: 3,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
      titleKey: "step3_title",
      headingKey: "step3_heading",
      textKey: "step3_text",
    }
  ];

  // An array of images corresponding to the steps
  const stepImages = [
    '/images/how-it-works-1.png',
    '/images/how-it-works-2.png',
    '/images/how-it-works-3.png',
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">{t('kicker')}</h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">{t('title')}</p>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>

          <div className="mt-12 space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                onMouseEnter={() => setHoveredStep(step.id)} // Set the hovered step on mouse enter
                // Apply highlight styles conditionally
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${hoveredStep === step.id ? 'border-red-500 bg-red-50 shadow-lg' : 'border-transparent'}`}
              >
                <Step
                  icon={step.icon}
                  title={t(step.titleKey)}
                  heading={t(step.headingKey)}
                  text={t(step.textKey)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="hidden lg:block">
          <Image
            src={stepImages[hoveredStep - 1]} // Dynamically change the image source
            alt="Phone showing garage booking steps"
            width={600}
            height={800}
            className="rounded-lg transition-opacity duration-300"
            key={hoveredStep} // Add a key to force re-render on change for fade effect
          />
        </div>
      </div>
    </section>
  );
}