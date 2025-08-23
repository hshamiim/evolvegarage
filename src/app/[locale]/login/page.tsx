'use client';

// Import our new translated component
import TranslatedAuthenticator from '@/components/TranslatedAuthenticator';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center py-20">
      <TranslatedAuthenticator />
    </div>
  );
}