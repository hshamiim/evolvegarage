'use client';

import TranslatedAuthenticator from '../../../components/TranslatedAuthenticator';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center py-20">
      <TranslatedAuthenticator initialState="signUp" />
    </div>
  );
}