"use client";
import { AuthProvider } from "react-oidc-context";
import { cognitoAuthConfig } from "../oidcConfig";

export default function OidcProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
}
