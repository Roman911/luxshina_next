import { Metadata } from 'next';
import { ReactNode } from 'react';

import { Language } from '@/models/language';
import { generateCatalogMetadata } from '@/utils/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	return generateCatalogMetadata({ locale, urlPath: `comparison` });
}

export default async function LocaleLayout({ children }: { children: ReactNode }) {
	return (
		<>
			{ children }
		</>
	);
};
