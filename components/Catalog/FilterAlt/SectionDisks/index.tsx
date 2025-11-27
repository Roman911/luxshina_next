import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IOpenFilter, Subsection } from '@/models/filter';
import { Select } from '../Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import type { BaseDataProps, Brand } from '@/models/baseData';
import { typeDisc } from '../customParamForSelector';
import { Language } from '@/models/language';
import { Section } from '@/models/section';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { close, open, setScrollValue } from '@/store/slices/filterIsOpenSlice';

interface Props {
	brand: Brand | null | undefined
	filterData?: BaseDataProps
	section: Section
	slug: string[]
}

const SectionDisks: FC<Props> = ({ brand, filterData, section, slug }) => {
	const t = useTranslations('Filters');
	const locale = useLocale();
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const { filterIsOpen } = useAppSelector(state => state.filterIsOpenReducer);
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ brand?.value }`);

	const handleClickOpen = (name: keyof IOpenFilter, value: boolean) => {
		if (value) {
			dispatch(open({ key: name, value: true }));
		} else {
			dispatch(close(name));
		}
	};

	const handleScroll = (name: keyof IOpenFilter, value: number) => {
		dispatch(setScrollValue({ key: name, value }));
	}

	return (
		<>
			{ subsection === Subsection.ByParams && <>
				<Select
					name='width'
					label={ t('width') }
					checkboxKey='w-'
					options={ filterData?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
					variant='gray'
					filterValue={ filter?.width ? filter.width.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.width.open }
					scroll={ filterIsOpen.width.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					name='radius'
					label={ t('diameter') }
					checkboxKey='d-'
					options={ filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || []}
					variant='gray'
					filterValue={ filter?.radius ? filter.radius.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.radius.open }
					scroll={ filterIsOpen.radius.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			<Select
				name='krepeg'
				label={ t('fasteners') }
				checkboxKey='kr-'
				options={ data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='gray'
				filterValue={ filter?.krepeg ? filter.krepeg.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.krepeg.open }
				scroll={ filterIsOpen.krepeg.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<SelectFromTo name='et' idMin='etfrom' idMax='etto' minus={ true } from={ -140 } to={ 500 }
										title={ `ET(${ t('departure') })` } btnTitle={ t('to apply') }/>
			<SelectFromTo name='dia' idMin='diafrom' idMax='diato' from={ 46 } to={ 500 } title='DIA'
										btnTitle={ t('to apply') }/>
			<Select
				name='typedisk'
				label={ t('type') }
				checkboxKey='td-'
				options={ typeDisc.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				})) }
				variant='white'
				filterValue={ filter?.typedisk ? filter.typedisk.split(',') : [] }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.typedisk.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='colir'
				label={ t('color') }
				checkboxKey='clr-'
				options={ data?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='white'
				filterValue={ filter?.colir ? filter.colir.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.colir.open }
				scroll={ filterIsOpen.colir.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='brand'
				label={ t('brand') }
				checkboxKey='b-'
				options={ data?.brand_disc?.map(item => ({ value: `${item.alias}`, label: item.label })) || []}
				variant='white'
				filterValue={ (slug && slug.includes('brand')) ? [ '1' ] : [] }
				search={ true }
				section={ section }
				slug={ slug }
				brand={ brand }
				isOpened={ filterIsOpen.brand.open }
				scroll={ filterIsOpen.brand.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			{ slug && slug.includes('brand') && manufModels && manufModels.length > 0 && <Select
				name='model_id'
				label={ t('model') }
				checkboxKey='m-'
				options={ manufModels?.map(item => ({ value: `${item.value}`, label: item.label })) || [] }
				variant='white'
				filterValue={ filter?.model_id ? filter.model_id.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.model_id.open }
				scroll={ filterIsOpen.model_id.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/> }
		</>
	)
};

export default SectionDisks;
