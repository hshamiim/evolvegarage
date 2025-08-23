'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

// Configure Amplify with the outputs from your backend
Amplify.configure(outputs, { ssr: true });

export default function ConfigureAmplify() {
  return null; // This component doesn't render anything
}