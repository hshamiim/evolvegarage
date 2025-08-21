// src/app/[locale]/layout.tsx
import './globals.css'; // This is the critical missing line
import {NextIntlClientProvider, useMessages} from 'next-intl';
import type { Metadata } from "next"; // Good practice to include this

export const metadata: Metadata = {
  title: "Evolve Garage",
  description: "Automotive Servicing and Repair in Leicester",
};

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}