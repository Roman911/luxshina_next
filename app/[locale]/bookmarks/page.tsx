import { useTranslations } from 'next-intl';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Title from '@/components/UI/Title';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import BookmarksWrapper from '@/components/Bookmarks';
import { Language } from '@/models/language';
import type { Metadata } from 'next';
import { generateCatalogMetadata } from '@/utils/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	return generateCatalogMetadata({ locale, urlPath: `bookmarks`});
}

export default function Bookmarks() {
	const t = useTranslations('Favorites');

	const path = [
		{
			title: t('favorites'),
			href: '/'
		}
	];

	return <LayoutWrapper>
		<Breadcrumbs path={ path }/>
		<Title title={ t('favorites') }/>
		<BookmarksWrapper />
	</LayoutWrapper>
};
