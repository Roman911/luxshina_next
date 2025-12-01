'use client'
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/hooks/redux';
import { Car2BrandProps } from '@/models/featureParams';
import { setProgress } from '@/store/slices/progressSlice';
import { Button } from '@heroui/react';

interface PopularBrandsProps {
	data: Car2BrandProps[] | undefined
}

const PopularBrands: FC<PopularBrandsProps> = ({ data }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const handleClick = () => {
		dispatch(setProgress(true));
	}

	return <>
		<div className='grid grid-cols-2 lg:grid-cols-6 mt-12 gap-5 mb-8'>
			{ data?.map((item, index) => (
				<Button
					as={ Link }
					key={ index }
					color='primary'
					radius='full'
					variant='bordered'
					size='lg'
					href={ `/katalog/avtoshini/car-${ item.name.toLowerCase() }-${ item.id }` }
					onPress={ handleClick }
					className='text-black font-semibold w-full'
				>
					{ item.name }
				</Button>
			)) }
		</div>
		<Button variant='light' size='lg' color='primary' className='text-lg uppercase font-bold text-primary' as={ Link } href='/katalog/avtoshini/car-all'>
			{ t('show all') }
		</Button>
	</>
};

export default PopularBrands;
