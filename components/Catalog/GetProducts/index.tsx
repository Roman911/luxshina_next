'use client';

import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { baseDataAPI } from '@/services/baseDataService';
import { Section } from '@/models/filter';
import Pagination from '@/components/Catalog/Pagination';
import { Button, Spinner } from '@heroui/react';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';

interface Props {
	searchParams: string;
	pageFrom: number | null;
	pageTo: number | null;
	section: Section;
	slug?: string[];
	pageItem: number;
}

export function GetProducts(
	{
		searchParams,
		pageFrom,
		section,
		slug,
		pageItem
	}: Props) {
	const currentPage = pageFrom ?? 1;
	const start = (currentPage - 1) * pageItem;

	const {
		data,
		isFetching,
		isLoading
	} = baseDataAPI.useFetchProductsQuery({
		id: searchParams,
		start,
		length: pageItem,
	});

	const totalCount = data?.data?.total_count ?? 0;
	const totalPages = useMemo(() => Math.ceil(totalCount / pageItem), [ totalCount, pageItem ]);

	const handleScroll = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const { ref, inView } = useInView(
		{
			trackVisibility: true, delay: 100, threshold: 1, rootMargin: '200px'
		}
	);

	return (
		<>
			{ (isLoading || (!data && isFetching)) && <div className='fixed top-0 left-0 bottom-0 right-0 bg-white/60 dark:bg-[#222]/40 z-20'>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					<Spinner size='lg' />
				</div>
			</div> }
			<div ref={ ref }></div>
			{ !data?.result && !isLoading && !isFetching && !data?.data && <NoResult noResultText='no result' /> }
			{ data?.result && <ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
				data={ data.data }
			/> }
			{ data?.result && totalCount > pageItem && (
				<div className='mt-10'>
					<Pagination
						initialPage={ currentPage }
						total={ totalPages }
						slug={ slug || [] }
						section={ section }
					/>
				</div>
			) }
			{ !inView && <Button isIconOnly size='lg' onPress={ handleScroll } className='fixed z-50 right-3 md:right-12 bottom-20 md:bottom-64 bg-gray-500 text-white shadow-lg'>
				<svg xmlns="http://www.w3.org/2000/svg" width={ 24 } height={ 24 } viewBox="0 0 512 512">
					<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" fill="currentColor"/>
				</svg>
			</Button> }
		</>
	);
}
