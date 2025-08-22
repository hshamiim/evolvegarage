import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import "../globals.css";

import Navbar from "../../components/Navbar";
// import Footer from "@/components/Footer"; // Import the new Footer
// If Footer.tsx exists in src/components, ensure the file is present.
// Otherwise, update the path below to the correct location:
import Footer from "../../components/Footer"; // Adjust path if needed

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
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Replace the old footer with the new one */}
            <Footer />

          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}