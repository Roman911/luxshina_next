import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Subsection } from '@/models/filter';
import { Select } from '../Select';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import type { BaseDataProps, Brand } from '@/models/baseData';
import { typeDisc } from '../customParamForSelector';
import { Language } from '@/models/language';
import { Section } from '@/models/section';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';

interface Props {
	brand: Brand | null | undefined
	filterData?: BaseDataProps
	section: Section
	slug: string[]
}

const SectionDisks: FC<Props> = ({ brand, filterData, section, slug }) => {
	const t = useTranslations('Filters');
	const locale = useLocale();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ brand?.value }`);

	return (
		<>
			{ subsection === Subsection.ByParams && <>
				<Select
					label={ t('width') }
					checkboxKey='w-'
					options={ filterData?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
					variant='gray'
					filterValue={ filter?.width ? filter.width.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
				/>
				<Select
					label={ t('diameter') }
					checkboxKey='d-'
					options={ filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || []}
					variant='gray'
					filterValue={ filter?.radius ? filter.radius.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
				/>
			</> }
			<Select
				label={ t('fasteners') }
				checkboxKey='kr-'
				options={ data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='gray'
				filterValue={ filter?.krepeg ? filter.krepeg.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
			/>
			<SelectFromTo name='et' idMin='etfrom' idMax='etto' minus={ true } from={ -140 } to={ 500 }
										title={ `ET(${ t('departure') })` } btnTitle={ t('to apply') }/>
			<SelectFromTo name='dia' idMin='diafrom' idMax='diato' from={ 46 } to={ 500 } title='DIA'
										btnTitle={ t('to apply') }/>
			<Select
				label={ t('type') }
				checkboxKey='td-'
				options={ typeDisc.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })) || []}
				variant='white'
				filterValue={ filter?.typedisk ? filter.typedisk.split(',') : [] }
				section={ section }
				slug={ slug }
			/>
			<Select
				label={ t('color') }
				checkboxKey='clr-'
				options={ data?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='white'
				filterValue={ filter?.colir ? filter.colir.split(',') : [] }
				search={ true }
				section={ section }
				slug={ slug }
			/>
			<Select
				label={ t('brand') }
				checkboxKey='b-'
				options={ data?.brand_disc?.map(item => ({ value: `${item.alias}`, label: item.label })) || []}
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
		</>
	)
};

export default SectionDisks;
