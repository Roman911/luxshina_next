import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { IOpenFilter, Subsection } from '@/models/filter';
import { Select } from '../Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import type { BaseDataProps, Brand } from '@/models/baseData';
import { appointmentCargo, appointmentIndustrial, customTireSeason } from '../customParamForSelector';
import { close, open, setScrollValue } from '@/store/slices/filterIsOpenSlice';
import { Language } from '@/models/language';
import { Section } from '@/models/section';
import { Link } from '@/i18n/routing';
import { setProgress } from '@/store/slices/progressSlice';
import { Checkbox, CheckboxGroup } from '@heroui/react';
import { twMerge } from 'tailwind-merge';
import { getModel } from '@/lib/brand';

interface Props {
	brand: Brand | null | undefined
	filterData?: BaseDataProps
	section: Section
	slug: string[]
}

export const SectionTires: FC<Props> = ({ brand, filterData, section, slug }) => {
	const t = useTranslations('Filters');
	const locale = useLocale();
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const { filterIsOpen } = useAppSelector(state => state.filterIsOpenReducer);
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ brand?.value }`);
	const country = locale === Language.UK ? data?.country : data?.country_ru;
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
			{ subsection === Subsection.ByParams && <>
				<Select
					name='width'
					label={ t('width') }
					focusValue='175'
					checkboxKey='w-'
					options={ filterData?.tyre_width.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
					variant='gray'
					filterValue={ filter.width ? filter.width.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.width.open }
					scroll={ filterIsOpen.width.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					name='height'
					label={ t('height') }
					focusValue='45'
					checkboxKey='h-'
					options={ filterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
					variant='gray'
					filterValue={ filter.height ? filter.height.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.height.open }
					scroll={ filterIsOpen.height.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					name='radius'
					label={ t('diameter') }
					focusValue='R14'
					checkboxKey='d-'
					options={ filterData?.tyre_diameter?.map(item => ({
						value: item.value,
						label: `R${ item.value }`,
						p: item.p
					})) || [] }
					variant='gray'
					filterValue={ filter.radius ? filter.radius.split(',') : [] }
					search={ true }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.radius.open }
					scroll={ filterIsOpen.radius.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			{ (section === Section.Tires || section === Section.Moto) && <>
				<Select
					name='sezon'
					label={ t('season') }
					checkboxKey='s-'
					options={ customTireSeason.map(item => ({
						value: item.value,
						label: locale === Language.UK ? item.name_ua : item.name
					})) }
					variant='white'
					filterValue={ filter.sezon ? filter.sezon.split(',') : [] }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.sezon.open }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			{ (section === Section.Cargo) && <>
				<Select
					name='vehicle_type'
					label={ t('appointment') }
					checkboxKey='vt-'
					options={ appointmentCargo.map(item => ({
						value: item.value,
						label: locale === Language.UK ? item.name_ua : item.name
					})) }
					variant='white'
					filterValue={ filter?.vehicle_type ? filter.vehicle_type.split(',') : [] }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.vehicle_type.open }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			{ (section === Section.Spectehnika) && <>
				<Select
					name='vehicle_type'
					label={ t('appointment') }
					checkboxKey='vt-'
					options={ appointmentIndustrial.map(item => ({
						value: item.value,
						label: locale === Language.UK ? item.name_ua : item.name
					})) }
					variant='white'
					filterValue={ filter?.vehicle_type ? filter.vehicle_type.split(',') : [] }
					section={ section }
					slug={ slug }
					isOpened={ filterIsOpen.vehicle_type.open }
					handleClickAction={ handleClickOpen }
				/>
			</> }
			<Select
				name='brand'
				label={ t('brand') }
				checkboxKey='b-'
				options={ data?.brand?.map(item => ({ value: `${ item.alias }`, label: item.label })) || [] }
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
				options={ manufModels?.map(item => ({ value: `${ item.alias }`, label: item.label })) || [] }
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
			<Select
				name='country'
				label={ t('country') }
				checkboxKey='ctr-'
				options={ country?.map(item => ({ value: item.value, label: item.label })) || [] }
				variant='white'
				filterValue={ filter?.country ? filter.country.split(',') : [] }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.country.open }
				scroll={ filterIsOpen.country.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			<Select
				name='year'
				label={ t('year') }
				checkboxKey='y-'
				options={ data?.tyre_year?.map(item => ({
					value: `${ item.value }`,
					label: `${ item.label }`
				})) || [] }
				variant='white'
				filterValue={ filter?.year ? filter.year.split(',') : [] }
				section={ section }
				slug={ slug }
				isOpened={ filterIsOpen.year.open }
				scroll={ filterIsOpen.year.scrollValue }
				handleScrollAction={ handleScroll }
				handleClickAction={ handleClickOpen }
			/>
			{ section === Section.Tires && <>
				<Select
					name='li'
					label={ t('load index') }
					checkboxKey='li-'
					options={ data?.load.map(item => ({ value: item.value, label: item.value })) || [] }
					variant='white'
					filterValue={ filter?.li ? filter.li.split(',') : [] }
					section={ section }
					slug={ slug }
					search={ true }
					isOpened={ filterIsOpen.li.open }
					scroll={ filterIsOpen.li.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					name='si'
					label={ t('speed index') }
					checkboxKey='si-'
					options={ data?.speed.map(item => ({ value: item.value, label: item.value })) || [] }
					variant='white'
					filterValue={ filter?.si ? filter.si.split(',') : [] }
					section={ section }
					slug={ slug }
					search={ true }
					isOpened={ filterIsOpen.si.open }
					scroll={ filterIsOpen.si.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<Select
					name='omolog'
					label={ t('homologation') }
					checkboxKey='hm-'
					options={ data?.omolog.map(item => ({ value: item.value, label: item.value })) || [] }
					variant='white'
					filterValue={ filter?.omolog ? filter.omolog.split(',') : [] }
					section={ section }
					slug={ slug }
					search={ true }
					isOpened={ filterIsOpen.omolog.open }
					scroll={ filterIsOpen.omolog.scrollValue }
					handleScrollAction={ handleScroll }
					handleClickAction={ handleClickOpen }
				/>
				<CheckboxGroup
					defaultValue={ [ slug?.includes('oc-1') ? 'oc-1' : '', slug?.includes('xl-1') ? 'xl-1' : '', slug?.includes('owl-1') ? 'owl-1' : '', slug?.includes('rf-1') ? 'rf-1' : '', slug?.includes('ofr-1') ? 'ofr-1' : '' ] }
					label={ t('other') }
					className={ twMerge('relative w-full px-2', !open && 'hidden') }
					classNames={ { label: 'mt-2 font-bold text-black text-sm' } }
					orientation='vertical'
				>
					<Link
						className='w-full flex'
						onClick={ () => dispatch(setProgress(true)) }
						href={ `/katalog/${ section }/${ slug ? slug.includes('oc-1') ? slug.filter(i => i !== 'oc-1').join('/') : `${ slug.join('/') }/oc-1` : '/oc-1' }` }
					>
						<Checkbox className='-z-10' radius="sm" size="lg" value='oc-1' classNames={ {
							label: 'text-black text-base',
							wrapper: 'bg-white before:-m-[1px]'
						} }>
							C
						</Checkbox>
					</Link>
					<Link
						className='w-full flex'
						onClick={ () => dispatch(setProgress(true)) }
						href={ `/katalog/${ section }/${ slug ? slug.includes('xl-1') ? slug.filter(i => i !== 'xl-1').join('/') : `${ slug.join('/') }/xl-1` : '/xl-1' }` }
					>
						<Checkbox className='-z-10' radius="sm" size="lg" value='xl-1' classNames={ {
							label: 'text-black text-base',
							wrapper: 'bg-white before:-m-[1px]'
						} }>
							XL
						</Checkbox>
					</Link>
					<Link
						className='w-full flex'
						onClick={ () => dispatch(setProgress(true)) }
						href={ `/katalog/${ section }/${ slug ? slug.includes('owl-1') ? slug.filter(i => i !== 'owl-1').join('/') : `${ slug.join('/') }/owl-1` : '/owl-1' }` }
					>
						<Checkbox className='-z-10' radius="sm" size="lg" value='owl-1' classNames={ {
							label: 'text-black text-base',
							wrapper: 'bg-white before:-m-[1px]'
						} }>
							{ locale === Language.UK ? 'OWL (белые буквы)' : 'OWL (білі букви)' }
						</Checkbox>
					</Link>
					<Link
						className='w-full flex'
						onClick={ () => dispatch(setProgress(true)) }
						href={ `/katalog/${ section }/${ slug ? slug.includes('rf-1') ? slug.filter(i => i !== 'rf-1').join('/') : `${ slug.join('/') }/rf-1` : '/rf-1' }` }
					>
						<Checkbox className='-z-10' radius="sm" size="lg" value='rf-1' classNames={ {
							label: 'text-black text-base',
							wrapper: 'bg-white before:-m-[1px]'
						} }>
							RunFlat
						</Checkbox>
					</Link>
					<Link
						className='w-full flex'
						onClick={ () => dispatch(setProgress(true)) }
						href={ `/katalog/${ section }/${ slug ? slug.includes('ofr-1') ? slug.filter(i => i !== 'ofr-1').join('/') : `${ slug.join('/') }/ofr-1` : '/ofr-1' }` }
					>
						<Checkbox className='-z-10' radius="sm" size="lg" value='ofr-1' classNames={ {
							label: 'text-black text-base',
							wrapper: 'bg-white before:-m-[1px]'
						} }>
							Off-Road 4x4
						</Checkbox>
					</Link>
				</CheckboxGroup>
			</> }
		</>
	)
};
