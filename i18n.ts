// i18n.ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => ({
  // This locale property was missing from the file in your repository
  locale, 
  messages: (await import(`./messages/${locale}.json`)).default
}));