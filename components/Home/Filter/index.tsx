'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeSection, reset as resetFilter } from '@/store/slices/filterSlice';
import { reset as resetFilterCar } from '@/store/slices/filterCarSlice';
import { baseDataAPI } from '@/services/baseDataService';
import Tab from './Tab';
import FilterByCar from './FilterByCar';
import DisksFilter from './DisksFilter';
import TiresFilter from './TiresFilter';
import { getFilters } from './getFilters';
import { Section } from '@/models/section';
import { Language } from '@/models/language';
import { generateUrl } from '@/lib/seo';

const Filter = ({ locale }: { locale: Language }) => {
	const { section } = useAppSelector(state => state.filterReducer);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [ isOpen, setOpen ] = useState(false);
	const [ filter, setFilter ] = useState({});
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const t = useTranslations('HeaderFilter');
	const filters = getFilters({ locale, section, data });

	const onChange = (name: string, value: number | string | null) => {
		if(value) {
			setFilter(prev => ({ ...prev, [name]: value }));
		}
	}

	const handleClick = (value: Section) => {
		const newOpenState = !(section === value && isOpen);
		setOpen(newOpenState);
		setFilter({});
		dispatch(resetFilter());
		dispatch(resetFilterCar());
		dispatch(changeSection(newOpenState ? value : Section.Tires));
	};

	const submit = () => {
		const searchUrl = generateUrl(filter);
		const rout = `/katalog/${section}/`;
		const newRout = `/${locale}${rout}`;

		router.push(newRout + searchUrl);
	}

	const renderFilter = () => {
		switch(section) {
			case Section.Disks:
				return <DisksFilter filters={ filters } onChange={ onChange } onSubmit={ submit } />;
			case Section.Car:
				return <FilterByCar />;
			default:
				return <TiresFilter filters={ filters } onChange={ onChange } onSubmit={ submit } />;
		}
	};

	return <section className='bg-blue-600 lg:flex'>
		<Image width={ 555 } height={ 669 } src={ `/images/home_filter/${section}.jpg` } className='hidden lg:block max-w-sm xl:max-w-full' alt=""/>
		<div className="py-6 px-5 md:px-8 lg:py-16 xl:py-24 2xl:px-28 max-w-screen-lg w-full">
			<h1 className="text-white text-xl md:text-4xl xl:text-[44px] leading-[54px] font-bold uppercase text-center md:text-left">
				{ t('selection of tires and wheels') }
			</h1>
			<div className="mt-2 lg:mt-11 flex flex-col md:flex-row text-blue-300">
				<Tab name={ Section.Tires } section={ section } isOpen={ isOpen } handleClick={ handleClick } label={ t('tires by parameters') }>
					<TiresFilter filters={ filters } onChange={ onChange } onSubmit={ submit }  />
				</Tab>
				<Tab name={ Section.Disks } section={ section } isOpen={ isOpen } handleClick={ handleClick } label={ t('disks by parameters') }>
					<DisksFilter filters={ filters } onChange={ onChange } onSubmit={ submit } />
				</Tab>
				<Tab name={ Section.Car } section={ section } isOpen={ isOpen } handleClick={ handleClick } label={ t('selection by car') }>
					<FilterByCar />
				</Tab>
			</div>
			<div className="hidden md:block">{ renderFilter() }</div>
		</div>
	</section>
};

export default Filter;
