'use client'
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Car2BrandProps } from '@/models/featureParams';
import { setCarFilter } from '@/store/slices/filterCarSlice';
import { changeSubsection } from '@/store/slices/filterSlice';
import { Subsection } from '@/models/filter';
import { Button } from '@heroui/react';

interface PopularBrandsProps {
	data: Car2BrandProps[] | undefined
}

const PopularBrands: FC<PopularBrandsProps> = ({ data }) => {
	const dispatch = useAppDispatch();
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const t = useTranslations('Main');

	const handleClick = (brand: number) => {
		dispatch(setCarFilter({ ...filter, brand }));
		dispatch(changeSubsection(Subsection.ByCars));
	}

	return <>
		<div className='grid grid-cols-2 lg:grid-cols-6 mt-12 gap-5 mb-8'>
			{ data?.map((item, index) => (
				<Button key={index} as={Link} color='primary' radius='full' variant='bordered' size='lg'
								className='text-black font-semibold w-full' onPress={ () => handleClick(item.id) } href='/katalog/avtoshini'>
					{ item.name }
				</Button>
			)) }
		</div>
		<Button variant='light' size='lg' color='primary' className='text-lg uppercase font-bold text-primary' as={Link} onPress={() => dispatch(changeSubsection(Subsection.ByCars))} href='/katalog/avtoshini'>
			{ t('show all') }
		</Button>
	</>
};

export default PopularBrands;
