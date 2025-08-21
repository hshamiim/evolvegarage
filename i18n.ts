// i18n.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // This is the simplest way to satisfy TypeScript.
  // We're providing a default fallback to 'en' if the locale is undefined.
  const effectiveLocale = locale || 'en';

  return {
    locale: effectiveLocale,
    messages: (await import(`./messages/${effectiveLocale}.json`)).default
  };
});