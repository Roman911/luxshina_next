import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_ACCESS_ORIGIN: process.env.ACCESS_ORIGIN,
	},
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		formats: ['image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'opt.tyreclub.com.ua',
				pathname: '/api/public/img/user/**',
			},
			{
				protocol: 'https',
				hostname: 'admin.luxshina.ua',
				pathname: '**',
			},
		],
	},
};

export default withNextIntl(nextConfig);
