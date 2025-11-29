import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '../Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import type { Brand } from '@/models/baseData';
import { Section } from '@/models/section';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { IOpenFilter } from '@/models/filter';
import { close, open, setScrollValue } from '@/store/slices/filterIsOpenSlice';
import { getModel } from '@/lib/brand';

interface Props {
	brand: Brand | null | undefined
	section: Section
	slug: string[]
}

const SectionBattery: FC<Props> = ({ brand, section, slug }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Filters');
	const { filter } = useAppSelector(state => state.filterReducer);
	const { filterIsOpen } = useAppSelector(state => state.filterIsOpenReducer);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ brand?.value }`);
	const model = getModel(slug, manufModels);

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
			<Select
				name='jemnist'
				label={ t('capacity') }
				checkboxKey='ct-'
				options={ dataAkum?.jemnist.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
				variant='gray'
				filterValue={ filter?.jemnist ? filter.jemnist.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.jemnist.open }
				scroll={ filterIsOpen.jemnist.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='puskovii_strum'
				label={ t('starting current') }
				checkboxKey='sk-'
				options={ dataAkum?.['puskovii-strum'].map(item => ({
					value: item.value,
					label: item.value,
					p: item.p
				})) || [] }
				variant='gray'
				filterValue={ filter?.puskovii_strum ? filter.puskovii_strum.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.puskovii_strum.open }
				scroll={ filterIsOpen.puskovii_strum.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='tip_elektrolitu'
				label={ t('type of electrolyte') }
				checkboxKey='elt-'
				options={ dataAkum?.['tip-elektrolitu'].map(item => ({
					value: item.value,
					label: item.value,
					p: item.p
				})) || [] }
				variant='gray'
				filterValue={ filter?.tip_elektrolitu ? filter.tip_elektrolitu.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.tip_elektrolitu.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='tip_korpusu'
				label={ t('body type') }
				checkboxKey='tk-'
				options={ dataAkum?.['tip-korpusu'].map(item => ({ value: item.value, label: item.p, p: item.p })) || [] }
				variant='white'
				filterValue={ filter?.tip_korpusu ? filter.tip_korpusu.split(',') : [] }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.tip_korpusu.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='brand'
				label={ t('brand') }
				checkboxKey='b-'
				options={ dataAkum?.brand_akum?.map(item => ({ value: item.alias, label: item.label })) || [] }
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
				options={ manufModels?.map(item => ({ value: `${item.alias}`, label: item.label })) || [] }
				variant='white'
				filterValue={ (slug && slug.includes('model')) ? [ '1' ] : [] }
				search={ true }
				section={ section }
				slug={ slug }
				model={ model }
				isOpened={ filterIsOpen.model_id.open }
				scroll={ filterIsOpen.model_id.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/> }
			<SelectFromTo name='sirina' idMin='wfrom' idMax='wto' from={ 0 } to={ 600 } title={ `${ t('width') } (см)` }
										btnTitle={ t('to apply') }/>
			<SelectFromTo name='visota' idMin='hfrom' idMax='hto' from={ 0 } to={ 190 } title={ `${ t('height') } (см)` }
										btnTitle={ t('to apply') }/>
			<SelectFromTo name='dovzina' idMin='lngfrom' idMax='lngto' from={ 0 } to={ 600 }
										title={ `${ t('length') } (см)` } btnTitle={ t('to apply') }/>
			<Select
				name='napruga'
				label={ t('high-voltage') }
				checkboxKey='am-'
				options={ dataAkum?.napruga.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
				variant='white'
				filterValue={ filter?.napruga ? filter.napruga.split(',') : [] }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.napruga.open }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='poliarnist'
				label={ t('polarity') }
				checkboxKey='pl-'
				options={ dataAkum?.poliarnist.map(item => ({ value: item.value, label: item.p, p: item.p })) || [] }
				variant='white'
				filterValue={ filter?.poliarnist ? filter.poliarnist.split(',') : [] }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.poliarnist.open }
				handleClickAction={ handleClickOpen }
			/>
		</>
	)
};

export default SectionBattery;
