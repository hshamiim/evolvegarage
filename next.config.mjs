import withNextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl('./src/i18n.ts')(nextConfig);