'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export default function Newsletter() {
  const t = useTranslations('Newsletter');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage('');

    try {
      // Try to create newsletter subscription in DynamoDB
      await client.models.NewsletterSubscription.create({
        email: email,
        subscribedAt: new Date().toISOString(),
        isActive: true,
      });

      setMessage(t('successMessage') || `Thank you for subscribing with ${email}!`);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Fallback for local development - simulate successful subscription
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Simulating successful newsletter subscription for:', email);
        setMessage(t('successMessage') || `Thank you for subscribing with ${email}! (Development mode)`);
        setEmail('');
      } else {
        setMessage(t('errorMessage') || 'There was an error subscribing. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:flex lg:items-center lg:justify-between">
          
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-500">
              {t('text')}
            </p>
          </div>

          <div className="mt-8 lg:mt-0 lg:ml-8">
            <form onSubmit={handleSubscribe} className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                {t('emailLabel')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 rounded-md disabled:opacity-50"
                placeholder={t('emailPlaceholder')}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 border border-transparent rounded-md shadow-sm px-5 py-3 flex items-center justify-center text-base font-medium text-white"
              >
                {isLoading ? (t('subscribingText') || 'Subscribing...') : t('buttonText')}
              </button>
            </form>
            
            {message && (
              <div className={`mt-4 p-3 rounded-md ${message.includes('error') || message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}