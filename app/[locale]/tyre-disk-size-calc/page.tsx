import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import CalcWrapper from '@/components/TyreDiskSizeCalc/Wrapper';
import { Language } from '@/models/language';
import type { Metadata } from 'next';
import { generateCatalogMetadata } from '@/utils/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	return generateCatalogMetadata({ locale, urlPath: `tyre-disk-size-calc`});
}

export default function TyreDiskSizeCalc() {
	const path = [
		{
			title: 'tire calculator',
			translations: true,
			href: '/tyre-disk-size-calc'
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title='tire calculator' translations={ true } />
			<CalcWrapper />
		</LayoutWrapper>
	)
};
