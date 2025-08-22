import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import "../globals.css";

// Import the Navbar component
import Navbar from "../../components/Navbar";

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
            
            {/* --- Navbar is placed here --- */}
            <Navbar />
            
            {/* Page content will be rendered inside the <main> tag */}
            <main className="flex-grow">
              {children}
            </main>
            
            {/* A simple footer at the bottom */}
            <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
              <p>&copy; {new Date().getFullYear()} Evolve Garage. All Rights Reserved.</p>
            </footer>

          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}