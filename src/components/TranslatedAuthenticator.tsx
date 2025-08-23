'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Authenticator, 
  useAuthenticator, 
  Heading, 
  View, 
  Button 
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useLocale, useTranslations } from 'next-intl';
import { I18n } from 'aws-amplify/utils';

const CustomHeader = () => {
  const { route } = useAuthenticator((context) => [context.route]);
  const t = useTranslations('Auth');
  const title = route === 'signIn' ? t('signInTitle') : t('createAccountTitle');
  return (
    <Heading level={3} padding="medium" textAlign="center">
      {title}
    </Heading>
  );
};

const CustomSignInFooter = () => {
  const { toForgotPassword } = useAuthenticator();
  const t = useTranslations('Auth');
  return (
    <View textAlign="center" paddingTop="medium">
      <Button
        onClick={toForgotPassword}
        variation="link"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        {t('forgotPassword')}
      </Button>
    </View>
  );
};

const CustomSignUpFooter = () => {
  const { toSignIn } = useAuthenticator();
  const t = useTranslations('Auth');
  return (
    <View textAlign="center" paddingTop="medium">
      <span className="text-sm">{t('haveAccount')} </span>
      <Button
        onClick={toSignIn}
        variation="link"
        className="text-red-600 hover:text-red-700 font-semibold text-sm"
      >
        {t('signInButton')}
      </Button>
    </View>
  );
};

function PostLoginRedirect() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push(`/${locale}/dashboard`);
    }
  }, [authStatus, router, locale]);
  return null;
}

// --- 1. Add the initialState prop to the function definition ---
export default function TranslatedAuthenticator({ initialState = 'signIn' }: { initialState?: 'signIn' | 'signUp' }) {
  const t = useTranslations('Auth');
  const locale = useLocale();

  useEffect(() => {
    const translations = {
      'Sign In': t('signInButton'),
      'Sign in': t('signInButton'),
      'Create Account': t('createAccountTitle'),
      'Create account': t('signUpButton'),
      'Email': t('emailLabel'),
      'Password': t('passwordLabel'),
      'Forgot your password?': t('forgotPassword'),
      'Confirm Sign Up': t('confirmSignUpTitle'),
      'Confirmation Code': t('confirmationCodeLabel'),
      'Enter your code': t('confirmationCodePlaceholder'),
      'Confirm': t('confirmButton'),
    };
    
    I18n.putVocabulariesForLanguage(locale, translations);
  }, [locale, t]);

  return (
    <div className="auth-container">
      <style jsx global>{`
        .auth-container .amplify-button--primary {
          background-color: #dc2626; /* red-600 */
          border-color: #dc2626;
        }
        .auth-container .amplify-button--primary:hover,
        .auth-container .amplify-button--primary:focus {
          background-color: #b91c1c; /* red-700 */
          border-color: #b91c1c;
        }
        .auth-container .amplify-tabs__item--active {
          border-color: #dc2626; /* red-600 */
          color: #dc2626;
        }
      `}</style>

      <Authenticator
        // --- 2. Pass the prop down to the Authenticator component ---
        initialState={initialState}
        formFields={{
          signIn: {
            username: { placeholder: t('emailPlaceholder') },
            password: { placeholder: t('passwordPlaceholder') },
          },
          signUp: {
            email: {
              placeholder: t('emailPlaceholder'),
              order: 1
            },
            password: {
              placeholder: t('passwordPlaceholder'),
              order: 2,
            },
            confirm_password: {
              placeholder: t('confirmPasswordPlaceholder'),
              order: 3,
            },
          },
          confirmSignUp: {
            confirmation_code: {
              placeholder: t('confirmationCodePlaceholder')
            }
          }
        }}
        components={{
          Header: CustomHeader,
          SignIn: { Footer: CustomSignInFooter },
          SignUp: { Footer: CustomSignUpFooter },
        }}
      >
        <PostLoginRedirect />
      </Authenticator>
    </div>
  );
}