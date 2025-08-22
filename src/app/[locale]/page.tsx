import {getTranslations} from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Homepage');

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">{t('welcome')}</h1>
      <p className="mt-4 text-lg">{t('tagline')}</p>
    </main>
  );
}