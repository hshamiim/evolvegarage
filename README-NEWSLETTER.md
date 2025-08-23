# Newsletter Backend Setup with AWS DynamoDB

This guide explains how to set up the newsletter subscription functionality with AWS DynamoDB backend.

## Current Implementation

The newsletter component is fully functional with:
- ✅ **Frontend**: Newsletter subscription form with validation and feedback
- ✅ **Backend Schema**: AWS Amplify data model for newsletter subscriptions
- ✅ **Local Development**: Fallback mode for testing without AWS deployment
- ✅ **Error Handling**: Proper error messages and loading states
- ✅ **User Experience**: Form validation, success messages, and form reset

## Development Mode

In development mode, the newsletter will simulate successful subscriptions without requiring AWS deployment. The console will show:
```
Development mode: Simulating successful newsletter subscription for: user@example.com
```

## Production Deployment

To deploy to AWS and enable actual database storage:

### 1. Deploy Amplify Backend
```bash
npx ampx sandbox
```

This will:
- Create the DynamoDB table for `NewsletterSubscription`
- Set up authentication and authorization
- Generate the proper `amplify_outputs.json` configuration

### 2. Update Environment Variables
For production, ensure `NODE_ENV=production` to disable the development fallback.

### 3. Database Schema

The `NewsletterSubscription` model includes:
```typescript
{
  email: string (required),
  subscribedAt: datetime,
  isActive: boolean (default: true)
}
```

### 4. Authorization Rules
- **Guest users**: Can create subscriptions (subscribe)
- **Authenticated users**: Can read, update, delete subscriptions (admin access)

## Files Modified

- `amplify/data/resource.ts` - Added NewsletterSubscription schema
- `amplify/backend.ts` - Added data resource to backend
- `src/components/Newsletter.tsx` - Updated with AWS integration and fallback
- `messages/en.json` - Added success/error message translations
- `src/app/[locale]/layout.tsx` - Fixed font loading for build

## Testing

The newsletter form includes:
- Email validation
- Loading states during submission
- Success feedback with form reset
- Error handling with retry capability
- Development mode simulation for local testing

## Next Steps

1. Run `npx ampx sandbox` to deploy the backend
2. Test with real AWS DynamoDB integration
3. Set up email notifications for new subscriptions (optional)
4. Add admin interface to view/manage subscriptions (optional)