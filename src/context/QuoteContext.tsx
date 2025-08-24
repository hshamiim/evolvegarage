'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of all the data in our form
type QuoteFormData = {
  regPlate: string;
  setRegPlate: (plate: string) => void;
  carDetails: { make: string; model: string; details: string } | null;
  setCarDetails: (details: { make: string; model: string; details: string } | null) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  additionalInfo: string;
  setAdditionalInfo: (info: string) => void;
  selectedSlot: any;
  setSelectedSlot: (slot: any) => void;
};

// Create the context
const QuoteFormContext = createContext<QuoteFormData | undefined>(undefined);

// Create the Provider component that will wrap our form
export function QuoteFormProvider({ children }: { children: ReactNode }) {
  const [regPlate, setRegPlate] = useState('');
  const [carDetails, setCarDetails] = useState<{make: string, model: string, details: string} | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  return (
    <QuoteFormContext.Provider value={{ 
      regPlate, setRegPlate, 
      carDetails, setCarDetails,
      selectedServices, setSelectedServices,
      additionalInfo, setAdditionalInfo,
      selectedSlot, setSelectedSlot
    }}>
      {children}
    </QuoteFormContext.Provider>
  );
}

// Create a custom hook to easily use the context in our components
export function useQuoteForm() {
  const context = useContext(QuoteFormContext);
  if (context === undefined) {
    throw new Error('useQuoteForm must be used within a QuoteFormProvider');
  }
  return context;
}