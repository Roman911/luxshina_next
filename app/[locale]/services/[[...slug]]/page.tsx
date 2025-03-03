import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { Language, LanguageCode } from '@/models/language';
import type { Metadata } from 'next';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import ServicesPagination from '@/components/UI/ServicesPagination';

const pageItem = 12;

async function getProducts(page: number | null) {
	const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?typeproduct=5&categories=8`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
		body: JSON.stringify({ start: page ? (page - 1) * pageItem : 0, length: 12 }),
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const response = await fetch(`${process.env.SERVER_URL}/baseData/settings`)
		.then((res) => res.json());

	return {
		title: response[locale === Language.UK ? LanguageCode.UA : Language.RU].meta_title,
		description: response[locale === Language.UK ? LanguageCode.UA : Language.RU].meta_description,
	}
}

export default async function Services({ params }: { params: Promise<{ slug: string[] }> }) {
	const { slug } = await params;
	const value = slug?.find(item => item.startsWith('p-'));
	const page = value ? parseInt(value.split('-')[1], 10) : null;
	const products = await getProducts(page);

	const path = [
		{
			title: 'services',
			href: '/',
			translations: true
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title='auto goods' translations={ true } className='mt-3 text-lg font-medium px-0 md:px-3 mb-3 md:mb-1' />
			{ products.result ? <ProductList
				classnames='grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
				data={ products.data }
			/> : <NoResult noResultText='no result' /> }
			{ products.result && products.data.total_count > pageItem && <div className='mt-10 flex justify-center'>
				<ServicesPagination initialPage={ page || 1 } total={ Math.ceil(products.data.total_count/pageItem) } />
			</div> }
		</LayoutWrapper>
	)
};
