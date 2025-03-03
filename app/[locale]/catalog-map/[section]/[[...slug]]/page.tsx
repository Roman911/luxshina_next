import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';
import Title from '@/components/Lib/Title';
import { Language } from '@/models/language';
import { BrandsObject, BrandsObjectItems } from '@/models/brends';
import ProductList from '@/components/Brands/ProductList';
import BrandsList from '@/components/Brands/BrandsList';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const response = await fetch(`${process.env.SERVER_URL}/baseData/settings`)
		.then((res) => res.json());

	return {
		title: `${response[locale].meta_title} | ${response[locale].config_name}`,
		description: `${response[locale].meta_title} | ${response[locale].config_name}`,
	}
}

async function getBrands(id: string): Promise<BrandsObject | BrandsObjectItems> {
	const res = await fetch(`${process.env.SERVER_URL}/api/catalog-map/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function Brands({ params }: { params: Promise<{ locale: Language, section: string, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const brands = await getBrands( slug ? `${section}/${slug[0]}` : section);
	const title = `manufacturers ${ section }`;

	const path = [
		{
			title: 'brands',
			href: `/${locale}/catalog-map`,
			translations: true
		},
		{
			title: title,
			href: `/${locale}/catalog-map/${section}`,
			translations: true
		}
	];

	return (
		<Layout>
			<Breadcrumbs path={ path } />
			<Title title={ title } translations={ true } />
			<div className='columns-2 md:columns-4'>
				{ slug ?
					<ProductList section={ section } data={ brands } /> :
					<BrandsList brands={ brands } section={ section } />
				}
			</div>
		</Layout>
	)
};
