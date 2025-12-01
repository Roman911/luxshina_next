'use client'
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import { Section, Subsection } from '@/models/filter';
import type { BaseDataProps, Brand } from '@/models/baseData';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import FilterBtn from '@/components/Catalog/FilterByCar/FilterBtn';
import { twMerge } from 'tailwind-merge';
import { baseDataAPI } from '@/services/baseDataService';
import { SectionTires } from './SectionTires';
import SectionDisks from '@/components/Catalog/FilterAlt/SectionDisks';
import SectionBattery from '@/components/Catalog/FilterAlt/SectionBattery';
import * as Icons from '@/components/UI/Icons';
import { changeSubsection } from '@/store/slices/filterSlice';

interface Props {
	filterData: BaseDataProps | undefined
	section: Section
	slug: string[]
	brand: Brand | null | undefined
	car: string | null;
}

const FilterAlt: FC<Props> = ({ brand, filterData, section, slug, car }) => {
	const dispatch = useAppDispatch();
	const [ menuIsOpen, setMenuOpen ] = useState(false);
	const t = useTranslations('Filters');
	const { subsection } = useAppSelector(state => state.filterReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');

	useEffect(() => {
		dispatch(changeSubsection(Subsection.ByParams));
	}, [dispatch])

	const renderFilterContent = () => (
		<>
			{ section !== Section.Battery && <SwitchTabs section={ section } car={ car } /> }
			<div
				className={ twMerge('relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto lg:overflow-y-visible dark:border-[#333333] dark:bg-[#333333]', section === Section.Battery && 'pt-10 md:pt-4') }>
				{ (section === Section.Tires || section === Section.Disks) && <SwitchTabsByParams subsection={ subsection }/> }
				{ subsection === 'byCars' && <ByCar data={ data } car={ car } section={ section }/> }
				{ (section === Section.Tires || section === Section.Cargo || section === Section.Spectehnika || section === Section.Moto) &&
					<SectionTires brand={ brand } filterData={ filterData } section={ section } slug={ slug } /> }
				{ section === Section.Disks && <SectionDisks brand={ brand } filterData={ filterData } section={ section } slug={ slug } /> }
				{ section === Section.Battery && <SectionBattery brand={ brand } section={ section } slug={ slug } /> }
				<SelectFromTo
					name='price'
					idMin='pfrom'
					idMax='pto'
					from={ 200 }
					to={ 10000 }
					title={ `${ t('price range') } (грн)` }
					btnTitle={ t('to apply') }
				/>
			</div>
		</>
	);

	const onOpenChange = () => {
		setMenuOpen(prevState => !prevState);
	}

	return (
		<div className='w-72 duration-0'>
			<FilterBtn openFilter={ onOpenChange } title={ t('filters') }/>
			<div className='hidden lg:block'>{ renderFilterContent() }</div>
			<div>
				<div className={ twMerge('z-50 bg-overlay/50 backdrop-opacity-disabled w-screen h-screen fixed hidden inset-0', menuIsOpen && 'block') }></div>
				<div className={twMerge('z-50 backdrop-opacity-disabled w-screen h-screen fixed overflow-x-auto hidden bg-white dark:bg-[#18181b] inset-0', menuIsOpen && 'block')}>
					<button className='absolute top-2 right-2 z-100 p-2' onClick={ () => onOpenChange() } >
						<Icons.CloseIcon className='h-4 w-4'/>
					</button>
					{ renderFilterContent() }
				</div>
			</div>
		</div>
	);
};

export default FilterAlt;
