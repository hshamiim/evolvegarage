export const cognitoAuthConfig = {
  authority: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
  client_id: process.env.COGNITO_CLIENT_ID,
  redirect_uri: "https://d84l1y8p4kdic.cloudfront.net",
  response_type: "code",
  scope: "openid email profile",
};
