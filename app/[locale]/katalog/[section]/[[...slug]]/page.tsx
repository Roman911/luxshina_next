import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import { Language, LanguageCode } from '@/models/language';
import FilterAlt from '@/components/Catalog/FilterAlt';
import { Section } from '@/models/filter';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import FilterByCar from '@/components/Catalog/FilterByCar';
import { transformUrl } from './transformUrl';
import SelectionByCar from '@/components/Catalog/SelectionByCar';
import FilterActive from '@/components/Catalog/FilterActive';
import HeaderCatalog from '@/components/Catalog/HeaderCatalog';
import Pagination from '@/components/Catalog/Pagination';
import { getFilterData, getProducts } from '@/app/api/api';
import type { Metadata } from 'next';

const pageItem = 12;
const sort = {
	ch: '&order[asc]=1',
	ex: '&order[asc]=0',
	pop: '&order[value]=popular&order[asc]=0',
	off: '&order[value]=offers'
}

// async function getFilterData(id: string): Promise<BaseDataProps> {
// 	const res = await fetch(`${process.env.SERVER_URL}/api/FildterData/${id}`, {
// 		method: 'GET',
// 		headers: {
// 			'Access-Control-Allow-Credentials': 'true',
// 		}
// 	});
// 	return await res.json();
// }

// async function getProducts({ page, searchParams }: { page: number | null, searchParams: string }) {
// 	const res = await fetch(`${process.env.SERVER_URL}/api/getProducts?${searchParams}`, {
// 		method: 'POST',
// 		headers: {
// 			'Access-Control-Allow-Credentials': 'true',
// 			'content-type': 'application/json',
// 		},
// 		body: JSON.stringify({ start: page ? (page - 1) * pageItem : 0, length: 12 }),
// 	});
// 	return await res.json();
// }

async function getFilters() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getFiltersAkum() {
	const res = await fetch(`${process.env.SERVER_URL}/api/baseDataAkum`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
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

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const value = slug?.find(item => item.startsWith('p-'));
	const page = value ? parseInt(value.split('-')[1], 10) : null;
	const filterData = await getFilterData(
		`?typeproduct=${section === Section.Disks ? 3 : section === Section.Battery ? 4 : 1}`,
	);
	const paramsUrl = transformUrl({ section, slug });
	const found = slug?.find(item => item.startsWith('order-'))?.split('-')[1] as keyof typeof sort;
	let typeTires = null;
	if (slug?.includes('legkovi')) {
		typeTires = '&vehicle_type=1';
	} else if (slug?.includes('suv')) {
		typeTires = '&vehicle_type=2';
	} else if (slug?.includes('bus')) {
		typeTires = '&vehicle_type=8';
	} else if (slug?.includes('spectehnika')) {
		typeTires = '&vehicle_type=9';
	} else if (slug?.includes('gruzovie')) {
		typeTires = '&vehicle_type=3';
	} else if (slug?.includes('moto')) {
		typeTires = '&vehicle_type=7';
	}
	let season = null;
	if (slug?.includes('litni')) {
		season = '&s-1';
	} else if (slug?.includes('zimovi')) {
		season = '&s-2';
	} else if (slug?.includes('vsesezonnye')) {
		season = '&s-3';
	}
	const searchParams = `?${paramsUrl || ''}${typeTires || ''}${season || ''}${found && sort[found] ? sort[found] : ''}`;
	const products = await getProducts(searchParams, page ? (page - 1) * pageItem : 0, pageItem);
	const filters = await getFilters();
	const filtersAkum = await getFiltersAkum();

	return (
		<LayoutWrapper>
			<HeaderCatalog section={ section } slug={ slug } />
			<div className='py-5 lg:flex lg:gap-6'>
				<FilterAlt locale={ locale } filterData={ filterData } section={ section } slug={ slug } filters={ filters } filtersAkum={ filtersAkum } />
				<div className='flex-1 -mt-10 lg:-mt-12'>
					<FilterByCar />
					<SelectionByCar />
					<FilterActive locale={ locale } className='hidden lg:flex' slug={ slug } section={ section } />
					{ products.result ? <ProductList
						classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
						data={ products.data }
					/> : <NoResult noResultText='no result' /> }
					{ products.result && products.data.total_count > pageItem && <div className='mt-10 flex justify-center'>
						<Pagination initialPage={ page || 1 } slug={ slug } total={ Math.ceil(products.data.total_count/pageItem) } section={ section } />
					</div> }
				</div>
			</div>
		</LayoutWrapper>
	)
};
