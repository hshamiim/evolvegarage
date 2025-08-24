import React from 'react';

export type ServiceCategory = 'mostPopular' | 'other';

export type Service = {
  id: string;
  nameKey: string;
  icon: JSX.Element;
  category: ServiceCategory;
};

export const services: Service[] = [
  // Main options
  { id: 'fullServiceMot', nameKey: 'fullServiceMot', category: 'mostPopular', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 12h8M8 16h8M8 8h8"/></svg> },
  { id: 'mot', nameKey: 'mot', category: 'mostPopular', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg> },
  { id: 'fullService', nameKey: 'fullService', category: 'mostPopular', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8h8M8 12h8M8 16h8"/></svg> },
  { id: 'brakes', nameKey: 'brakeRepairs', category: 'mostPopular', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> },
  { id: 'clutchReplacement', nameKey: 'clutchReplacement', category: 'mostPopular', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12"/></svg> },
  { id: 'cambelt', nameKey: 'cambelt', category: 'mostPopular', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8h8M8 16h8"/></svg> },
  // Modal categories
  { id: 'engine', nameKey: 'engineAndCooling', category: 'other', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M12 4v16"/></svg> },
  { id: 'electrical', nameKey: 'electricalAndBatteries', category: 'other', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/></svg> },
  { id: 'steering', nameKey: 'steeringAndSuspension', category: 'other', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg> },
  { id: 'tyres', nameKey: 'tyresWheelsTracking', category: 'other', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/></svg> },
  { id: 'gearbox', nameKey: 'gearboxRepairs', category: 'other', icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8h8M8 16h8"/></svg> },
];
// Note: I've shortened the SVG code to (...) for brevity, but you can keep the full SVG code you already have.