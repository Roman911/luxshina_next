import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { Language, LanguageCode } from '@/models/language';
import type { Metadata } from 'next';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';

async function getProducts() {
	const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?typeproduct=5&categories=7`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
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

export default async function AutoGoods() {
	const products = await getProducts();

	const path = [
		{
			title: 'auto goods',
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
		</LayoutWrapper>
	)
};
