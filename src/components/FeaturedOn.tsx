import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function FeaturedOn() {
  const t = await getTranslations('FeaturedOn');

  return (
    // Added min-h-[25vh] and flex to control height and alignment
    <section className="bg-red-600 min-h-[40vh] flex items-center">
      {/* Adjusted vertical padding */}
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Updated text size to match the Hero title */}
          <h2 className="text-white font-extrabold text-4xl md:text-5xl uppercase tracking-wider mb-12">
            {t('title')}
          </h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 items-center">
            <div className="flex items-center justify-center col-span-1">
              <Image
                src="/images/logos/whocanfixmycar.png"
                alt="WhoCanFixMyCar Logo"
                width={240}
                height={60}
                className="filter grayscale opacity-75 contrast-200 brightness-200"
              />
            </div>
            <div className="flex items-center justify-center col-span-1">
              <Image
                src="/images/logos/bookmygarage.png"
                alt="BookMyGarage Logo"
                width={240}
                height={60}
                className="filter grayscale opacity-75 contrast-200 brightness-200"
              />
            </div>
            <div className="flex items-center justify-center col-span-2 md:col-span-1">
              <Image
                src="/images/logos/mycarneedsa.png"
                alt="MyCarNeedsA.com Logo"
                width={240}
                height={60}
                className="filter grayscale opacity-75 contrast-200 brightness-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}