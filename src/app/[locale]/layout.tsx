import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import "../globals.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ThemeProvider } from "../../context/ThemeContext";
import ConfigureAmplify from "../../components/ConfigureAmplify";
import OidcProviderWrapper from "../../components/OidcProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evolve Garage - Leicester",
  description: "Your trusted local garage in Leicester",
};

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-gray-100`}>
        <ConfigureAmplify /> {/* --- 2. Add the component here --- */}
        <OidcProviderWrapper>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </OidcProviderWrapper>
      </body>
    </html>
  );
}