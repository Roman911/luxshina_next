import { ReactNode } from 'react';
import localFont from 'next/font/local';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { getAliasAll, getSettings, getMenu } from '@/app/api/api';
import '../colors.css';
import '../globals.css';
import { ToastProvider } from "@heroui/toast";
import { twMerge } from 'tailwind-merge';

const gilroy = localFont({
	src: [
		{
			path: '../../public/fonts/Gilroy-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-SemiBold.woff',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-Bold.woff',
			weight: '700',
			style: 'normal',
		},
	],
});

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: ReactNode;
		params: Promise<{ locale: string }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAliasAll();
	const menu = await getMenu();

	return (
		<html lang={ locale }>
		<head>
			<Script id="my-script">
				{response[0].head_html}
			</Script>
		</head>
		<body className={ twMerge('bg-[#F5F7FA]', gilroy.className) }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } alias={ alias } menu={menu} />
				<main>
					{ children }
				</main>
				<Footer settings={ response } alias={ alias } />
			</NextIntlClientProvider>
			<ToastProvider placement='top-right' />
		</StoreProvider>
		</body>
		<GoogleAnalytics gaId="GTM-PDGTR8" />
		</html>
	);
};
