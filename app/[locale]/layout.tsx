import localFont from 'next/font/local';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import '../colors.css';
import '../globals.css';
import { Language } from '@/models/language';
import { ToastProvider } from "@heroui/toast";

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

async function getSettings() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getAlias() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/StatiAlias`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: React.ReactNode;
		params: Promise<{ locale: Language }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAlias();

	return (
		<html lang={ locale }>
		<head>
			<Script id="my-script">
				{response[0].head_html}
			</Script>
		</head>
		<body className={ gilroy.className }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } alias={ alias } />
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
