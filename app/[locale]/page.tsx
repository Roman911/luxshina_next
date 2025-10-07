import type { Metadata } from 'next';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Filter from '@/components/Home/Filter';
import Title from '@/components/UI/Title';
import NoResult from '@/components/UI/NoResult';
import ProductList from '@/components/ProductList';
import TextSeo from '@/components/UI/TextSeo';
// import Carousel from '@/components/Home/Carousel';
import OurAdvantages from '@/components/Home/OurAdvantages';
import PopularSizesBlock from '@/components/Home/PopularSizesBlock';
import { getFeatureParams, getProducts, getSettings } from '@/app/api/api';
import { DEFAULT_HEADERS } from '@/config/api';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await fetch(`${ process.env.SERVER_URL }/baseData/settings`)
		.then((res) => res.json());

	return {
		title: response[lang].meta_title,
		description: response[lang].meta_description,
	}
}

export default async function Home({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await getSettings();
	const products = await getProducts('?vehicle_type=1&order[value]=popular&order[asc]=0', 0, 8);
	// const sliderData = await getSliderData();
	const featureParams = await getFeatureParams();

	return (
		<main>
			<Filter locale={ locale } />
			<LayoutWrapper>
				<Title title={ response[lang].h2_top }/>
				{ products.result ? <ProductList
					classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
					data={ products.data }
				/> : <NoResult noResultText='no result'/> }
				{/*<Carousel sliderData={ sliderData } />*/}
				<OurAdvantages />
				<PopularSizesBlock locale={ locale } settings={ response } featureParams={ featureParams } />
				<TextSeo description={ response[lang].description }/>
			</LayoutWrapper>
		</main>
	);
};
