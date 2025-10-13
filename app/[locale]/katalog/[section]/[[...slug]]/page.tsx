import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import { Language } from '@/models/language';
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
import { getFilterData, getFilters, getFiltersAkum, getProducts } from '@/app/api/api';
import type { Metadata } from 'next';
import { Season } from '@/lib/season';
import { TypeTires } from '@/lib/typeTires';
import { Brand } from '@/lib/brand';
import { TypeDisks } from '@/lib/typeDisks';
import { generateCatalogMetadata } from '@/utils/metadata';

const pageItem = 12;
const sort = {
	ch: '&order[asc]=1',
	ex: '&order[asc]=0',
	pop: '&order[value]=popular&order[asc]=0',
	off: '&order[value]=offers'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }): Promise<Metadata> {
	const { locale, section, slug } = await params;
	return generateCatalogMetadata({ locale, urlPath: `katalog/${section}/${slug?.join('/')}`});
}

export default async function Catalog({ params }: { params: Promise<{ locale: Language, section: Section, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const filters = await getFilters();
	const filtersAkum = await getFiltersAkum();
	const value = slug?.find(item => item.startsWith('p-'));
	const page = value ? parseInt(value.split('-')[1], 10) : null;
	const filterData = await getFilterData(`?typeproduct=${section === Section.Disks ? 3 : section === Section.Battery ? 4 : 1}`);
	const paramsUrl = transformUrl({ section, slug });
	const found = slug?.find(item => item.startsWith('order-'))?.split('-')[1] as keyof typeof sort;
	const typeTires = TypeTires(section, slug);
	const typeDisks = section === Section.Disks ? TypeDisks(slug) : null;
	const season = section === Section.Tires ? Season(slug) : null;
	const brand = Brand(section, slug, filters, filtersAkum);
	const searchParams = `?${paramsUrl || ''}${typeTires || ''}${typeDisks || ''}${season || ''}${found && sort[found] ? sort[found] : ''}${brand ? '&brand=' + brand.value : ''}`;
	const products = await getProducts(searchParams, page ? (page - 1) * pageItem : 0, pageItem);

	return (
		<LayoutWrapper>
			<HeaderCatalog section={ section } slug={ slug } />
			<div className='py-5 lg:flex lg:gap-6'>
				<FilterAlt locale={ locale } filterData={ filterData } section={ section } slug={ slug } filters={ filters } filtersAkum={ filtersAkum } brand={ brand } />
				<div className='flex-1 -mt-10 lg:-mt-12'>
					<FilterByCar />
					<SelectionByCar />
					<FilterActive locale={ locale } className='hidden lg:flex' slug={ slug } section={ section } brand={ brand } />
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
