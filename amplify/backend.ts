import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';

/**
 * @see https://docs.amplify.aws/gen2/build-a-backend/getting-started/define-your-backend-resources/
 */
export const backend = defineBackend({
  auth,
  // We will add data, functions, etc. here later
});