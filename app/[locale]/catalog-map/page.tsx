import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import { Breadcrumbs } from '@/components/UI';

const links = [
	{ href: 'catalog-map/tyre', title: 'tires', img: 'tire' },
	{ href: 'catalog-map/disc', title: 'disks', img: 'disk' },
	{ href: 'catalog-map/car', title: 'cars', img: 'car' },
];

export const metadata: Metadata = {
	title: 'Каталоги',
	description: 'Каталоги',
}

export default function CatalogMap() {
	const t = useTranslations('Main');

	const path = [
		{
			title: 'brands',
			href: '/brands',
			translations: true
		}
	];

	return (
		<Layout>
			<Breadcrumbs path={ path } />
			<div className='mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-5'>
				{ links.map((item, index) => (
					<Link key={ index } href={ `/${item.href}` } className='relative rounded-md group transition duration-300 overflow-hidden'>
						<Image
							src={ `/images/catalog-map/${item.img}.jpg` }
							alt={ t('tires') }
							width={ 490 }
							height={ 210 }
							className='transition-transform duration-300 group-hover:scale-125'
						/>
						<div
							className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold group-hover:text-teal-300 group-hover:underline'>
							{ t(item.title) }
						</div>
					</Link>
				)) }
			</div>
		</Layout>
	)
};
