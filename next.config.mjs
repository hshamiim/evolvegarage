// File: next.config.mjs

import withNextIntl from 'next-intl/plugin';

// This line tells the plugin where to find your main i18n configuration
const withNextIntlConfig = withNextIntl('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config options can go here if you have any
};

export default withNextIntlConfig(nextConfig);