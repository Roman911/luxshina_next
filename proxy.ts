import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === '/ua' || pathname.startsWith('/ua/')) {
		const url = request.nextUrl.clone();
		url.pathname = pathname.replace(/^\/ua/, '/uk');

		return NextResponse.redirect(url, 301);
	}

	return intlMiddleware(request);
}

export const config = {
	matcher: [
		'/',
		'/(uk|ru)/:path*',
		'/ua/:path*',
		'/((?!_next|_vercel|.*\\..*).*)'
	]
};