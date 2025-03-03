'use client'
import { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Pagination } from '@heroui/pagination';
import { Language } from '@/models/language';

interface Props {
	initialPage: number
	total: number
}

const ServicesPagination: FC<Props> = ({ initialPage, total }) => {
	const { locale } = useParams<{ locale: Language, section: string, slug: string[] }>();
	const router = useRouter();

	const onchange = (page: number) => {
		router.push(`/${locale}/services/p-${page}`)
	}

	return (
		<Pagination
			size='lg'
			initialPage={ initialPage }
			total={ total }
			variant='bordered'
			onChange={ onchange }
			classNames={{ cursor: 'text-black' }}
		/>
	)
};

export default ServicesPagination;
