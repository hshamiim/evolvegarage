"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Review } from '../data/reviews';
import StarRating from './StarRating';

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations('Reviews');
  const [isExpanded, setIsExpanded] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>(review.text);
  const [loading, setLoading] = useState(false);
  const locale = typeof window !== 'undefined' ? (navigator.language.split('-')[0] || 'en') : 'en';

  // Fetch translation when locale changes or review changes
  React.useEffect(() => {
    console.log('ReviewCard locale:', locale);
    if (locale === 'en') {
      setTranslatedText(review.text);
      return;
    }
    setLoading(true);
    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: review.text, targetLanguage: locale }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Translation API response:', data);
        setTranslatedText(data.translatedText || review.text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Translation API error:', err);
        setTranslatedText(review.text);
        setLoading(false);
      });
  }, [locale, review.text]);

  const isLongReview = translatedText.length > 250;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-bold block">{review.name}</span>
            {t('reviewedText')}
          </p>
        </div>
        <span className="text-green-500 text-2xl">✓</span>
      </div>
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {t(review.service || 'generalRepairs')}
        </span>
      </div>
      <p className={`text-gray-600 flex-grow mb-4 ${isLongReview && !isExpanded ? 'line-clamp-6' : ''}`}>
        {loading ? t('loadingText') : translatedText}
      </p>
      {isLongReview && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-600 font-semibold text-sm self-start hover:underline mb-4"
        >
          {isExpanded ? t('readLess') : t('readMore')}
        </button>
      )}
      <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-sm text-gray-500 mt-auto">
        <span>{review.car || t('sourceGoogle')}</span>
        <span>{review.timestamp}</span>
      </div>
    </div>
  );
}