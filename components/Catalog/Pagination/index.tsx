'use client'
import { FC, Key } from 'react';
import { Link } from '@/i18n/routing';
import { Pagination, PaginationItemType, PaginationItemValue } from '@heroui/react';
import { twMerge } from 'tailwind-merge';
import { Section } from '@/models/section';

interface Props {
	initialPage: number
	total: number
	slug: string[]
	section: Section
}

const MyPagination: FC<Props> = ({ initialPage, total, section, slug }) => {
	const params = slug ? slug.filter(item => !item.startsWith('p-')).join('/') : '';

	const renderItem = (
		{ key, value, isActive, className}:
		{ key?: Key, value: PaginationItemValue, isActive: boolean, className: string }
	) => {
		if (value === PaginationItemType.DOTS) {
			return (
				<button key={key} className={twMerge('border-none shadow-none', className)}>
					...
				</button>
			);
		}

		return <Link key={key} href={ `/katalog/${section}/p-${value}/${params}` }>
			<button
				className={twMerge(
					className,
					'border cursor-pointer',
					isActive && "text-white bg-primary font-bold",
				)}
			>
				{value}
			</button>
		</Link>
	}

	return (
		<Pagination
			size='lg'
			initialPage={ initialPage }
			total={ total }
			variant='bordered'
			renderItem={renderItem}
			classNames={{ cursor: 'text-black' }}
		/>
	)
};

export default MyPagination;
