import withNextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options can go here
};

export default withNextIntl('./i18n.ts')(nextConfig);