import React from 'react';

export type ServiceCategory = 'mostPopular' | 'other';

export type Service = {
  id: string;
  nameKey: string;
  icon: JSX.Element;
  category: ServiceCategory;
};

export const services: Service[] = [
  // Most Popular
  { id: 'fullServiceMot', nameKey: 'fullServiceMot', category: 'mostPopular', icon: <svg>...</svg> },
  { id: 'clutchReplacement', nameKey: 'clutchRepairs', category: 'mostPopular', icon: <svg>...</svg> },
  { id: 'brakes', nameKey: 'brakeRepairs', category: 'mostPopular', icon: <svg>...</svg> },
  // Other
  { id: 'mot', nameKey: 'mot', category: 'other', icon: <svg>...</svg> },
  { id: 'fullService', nameKey: 'fullService', category: 'other', icon: <svg>...</svg> },
  { id: 'engine', nameKey: 'engineAndCooling', category: 'other', icon: <svg>...</svg> },
  { id: 'aircon', nameKey: 'aircon', category: 'other', icon: <svg>...</svg> },
  // ... Add all other services from your list here
];
// Note: I've shortened the SVG code to (...) for brevity, but you can keep the full SVG code you already have.