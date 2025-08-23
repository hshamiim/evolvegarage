import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
/**
 * @see https://docs.amplify.aws/gen2/build-a-backend/getting-started/define-your-backend-resources/
 */
export const backend = defineBackend({
    auth,
    data,
});
