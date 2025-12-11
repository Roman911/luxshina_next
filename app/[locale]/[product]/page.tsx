import { Section } from '@/models/filter';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductComponent from '@/components/Product';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import TextSeo from '@/components/UI/TextSeo';
import type { Metadata } from 'next';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import { getSettings, getProduct, getProducts } from '@/app/api/api';
import { generateCatalogMetadata } from '@/utils/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language, product: string }> }): Promise<Metadata> {
	const { locale, product } = await params;
	return generateCatalogMetadata({ locale, urlPath: product });
}

export default async function Product({ params }: { params: Promise<{ locale: Language, product: string }> }) {
	const { locale, product } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const idProduct = match ? match[1] : '';
	const productResponse = await getProduct(idProduct);
	const settings = await getSettings();
	const section = /\bdia\d+\b/.test(product) ? Section.Disks : /(?:^|[^a-zA-Z])\d+ah(?=-|$)/.test(product) ? Section.Battery : Section.Tires;
	const tiresParams = productResponse?.data.offer_group;
	const searchParams = section === Section.Tires ? `?radius=${tiresParams?.diameter}&height=${tiresParams?.height}&width=${tiresParams?.width}` : section === Section.Disks ? '?typeproduct=3& ' : '';
	const products = await getProducts(searchParams, 0, 4 );

	console.log(productResponse);

	const path = [
		{
			title: section,
			translations: true,
			href: `/katalog/${ section }`
		},
		{
			title: productResponse?.data.full_name || '',
			translations: false,
			href: `/${ section }`
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path }/>
			<ProductComponent
				idProduct={ idProduct }
				locale={ locale }
				data={ productResponse }
				section={ section }
				settings={ settings }
			/>
			{ products.result ? <ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={ products.data }
			/> : <NoResult noResultText='no result' /> }
			<TextSeo description={ settings[lang].description }/>
		</LayoutWrapper>
	)
};
