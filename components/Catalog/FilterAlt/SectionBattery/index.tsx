import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Select } from '../Select';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import type { Brand } from '@/models/baseData';
import { Section } from '@/models/section';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';

interface Props {
	brand: Brand | null | undefined
	section: Section
	slug: string[]
}

const SectionBattery: FC<Props> = ({ brand, section, slug }) => {
	const t = useTranslations('Filters');
	const { filter } = useAppSelector(state => state.filterReducer);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ filter.brand }`);

	return (
		<>
			<Select
				label={ t('capacity') }
				checkboxKey='ct-'
				options={ dataAkum?.jemnist.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
				variant='gray'
				filterValue={ filter?.jemnist ? filter.jemnist.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
			/>
			<Select
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
			/>
			<Select
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
			/>
			<Select
				label={ t('body type') }
				checkboxKey='tk-'
				options={ dataAkum?.['tip-korpusu'].map(item => ({ value: item.value, label: item.p, p: item.p })) || [] }
				variant='white'
				filterValue={ filter?.tip_korpusu ? filter.tip_korpusu.split(',') : [] }
				section={ section }
				slug={ slug }
			/>
			<Select
				label={ t('brand') }
				checkboxKey='b-'
				options={ dataAkum?.brand_akum?.map(item => ({ value: item.alias, label: item.label })) || [] }
				variant='white'
				filterValue={ (slug && slug.includes('brand')) ? [ '1' ] : [] }
				search={ true }
				section={ section }
				slug={ slug }
				brand={ brand }
			/>
			{ slug && slug.includes('brand') && manufModels && manufModels.length > 0 && <Select
				label={ t('model') }
				checkboxKey='m-'
				options={ manufModels?.map(item => ({ value: `${item.value}`, label: item.label })) || [] }
				variant='white'
				filterValue={ filter?.model_id ? filter.model_id.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
			/> }
			<SelectFromTo name='sirina' idMin='wfrom' idMax='wto' from={ 0 } to={ 600 } title={ `${ t('width') } (см)` }
										btnTitle={ t('to apply') }/>
			<SelectFromTo name='visota' idMin='hfrom' idMax='hto' from={ 0 } to={ 190 } title={ `${ t('height') } (см)` }
										btnTitle={ t('to apply') }/>
			<SelectFromTo name='dovzina' idMin='lngfrom' idMax='lngto' from={ 0 } to={ 600 }
										title={ `${ t('length') } (см)` } btnTitle={ t('to apply') }/>
			<Select
				label={ t('high-voltage') }
				checkboxKey='am-'
				options={ dataAkum?.napruga.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
				variant='white'
				filterValue={ filter?.napruga ? filter.napruga.split(',') : [] }
				section={ section }
				slug={ slug }
			/>
			<Select
				label={ t('polarity') }
				checkboxKey='pl-'
				options={ dataAkum?.poliarnist.map(item => ({ value: item.value, label: item.p, p: item.p })) || [] }
				variant='white'
				filterValue={ filter?.poliarnist ? filter.poliarnist.split(',') : [] }
				section={ section }
				slug={ slug }
			/>
		</>
	)
};

export default SectionBattery;
