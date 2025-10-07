'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Checkbox, CheckboxGroup, Drawer, DrawerContent, useDisclosure } from '@heroui/react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setParams } from '@/store/slices/filterSlice';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import Select from './Select';
import { Section, Subsection } from '@/models/filter';
import type { BaseDataProps, Options } from '@/models/baseData';
import { SubmitFloat } from '@/components/Catalog/FilterAlt/SubmitFloat';
import { Language } from '@/models/language';
import { appointmentCargo, appointmentIndustrial, customTireSeason, others, typeDisc } from './customParamForSelector';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import * as Icons from '@/components/UI/Icons';
import MyCheckboxGroup from '@/components/Catalog/FilterAlt/CheckboxGroup';
import { setProgress } from '@/store/slices/progressSlice';
import { Link } from '@/i18n/routing';
import type { AkumProps } from '@/models/akumData';

interface Props {
	locale: Language
	filterData: BaseDataProps | undefined
	section: Section
	slug: string[]
	filters: BaseDataProps | undefined
	filtersAkum: AkumProps | undefined
}

const FilterAlt: FC<Props> = ({ locale, filterData, section, slug, filters, filtersAkum }) => {
	const t = useTranslations('Filters');
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const dispatch = useAppDispatch();
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const country = locale === Language.UK ? filters?.country : filters?.country_ru;

	const onChange = (name: string, value: number | string | undefined | null, element: HTMLElement) => {
		if(name === 'brand') {
			dispatch(setParams({ model_id: null }));
		}
		setElement(element);
		dispatch(setParams({ [name]: value }));
	}

	const renderSelect = (
		name: string,
		label: string,
		variant: 'white' | 'gray',
		options: Array<Options> = [],
		focusValue?: string | false,
		value?: null | number | string,
		search?: boolean,
		valueStudded?: null | number | string,
		filterOther?: {
			only_c: string | null | undefined
			only_xl: string | null | undefined
			only_owl: string | null | undefined
			only_run_flat: string | null | undefined
			only_off_road: string | null | undefined
		}
	) => (
		<div className='relative'>
			<Select
				name={ name }
				label={ label }
				focusValue={ focusValue }
				options={ options }
				variant={ variant }
				onChange={ onChange }
				filterValue={ value }
				search={ search }
				valueStudded={ valueStudded }
				filterOther={ filterOther }
			/>
		</div>
	);

	return (
		<div>
			<Button variant='light' onPress={ onOpen } className='font-bold lg:hidden text-medium'
							startContent={ <Icons.FilterIcon className='fill-black'/> }>{ t('filters') }</Button>
			<div className='hidden md:block'>
				{ (section === Section.Tires || section === Section.Disks) && <div
					className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
					<SwitchTabs section={ section }/>
				</div> }
				<div
					className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
					<SubmitFloat element={ element } btnTitle={ t('to apply') } setElement={ setElement }
											 offset={ (section === Section.Tires || section === Section.Disks) ? 340 : 294 }/>
					{ (section === Section.Tires || section === Section.Disks) && <SwitchTabsByParams subsection={ subsection }/> }
					{ subsection === Subsection.ByParams && <>
						{ (section === Section.Tires || section === Section.Cargo || section === Section.Spectehnika || section === Section.Moto) && <>
							<MyCheckboxGroup
								checkboxKey='w-'
								label={ t('width') }
								slug={ slug }
								section={ section }
								options={ filterData?.tyre_width.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
							/>
							<MyCheckboxGroup
								checkboxKey='h-'
								label={ t('height') }
								slug={ slug }
								section={ section }
								options={ filterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
							/>
							<MyCheckboxGroup
								checkboxKey='d-'
								label={ t('diameter') }
								slug={ slug }
								section={ section }
								options={ filterData?.tyre_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || [] }
							/>
						</> }
						{ section === Section.Disks && <>
							<MyCheckboxGroup
								checkboxKey='w-'
								label={ t('width') }
								slug={ slug }
								section={ section }
								options={ filterData?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
							/>
							<MyCheckboxGroup
								checkboxKey='d-'
								label={ t('diameter') }
								slug={ slug }
								section={ section }
								options={ filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || [] }
							/>
						</> }
					</> }
					{ subsection === 'byCars' && <ByCar data={ filters }/> }
					{ section === Section.Battery && <>
						<MyCheckboxGroup
							checkboxKey='ct-'
							label={ t('capacity') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.jemnist.map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='sk-'
							label={ t('starting current') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.['puskovii-strum'].map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='elt-'
							label={ t('type of electrolyte') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.['tip-elektrolitu'].map(item => ({ value: item.value, label: item.value, p: item.p })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='elt-'
							label={ t('body type') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.['tip-korpusu'].map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='b-'
							label={ t('brand') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.brand_akum?.map(item => ({ value: `${ item.value }`, label: item.label })) || [] }
						/>
					</> }
					{ (section === Section.Tires || section === Section.Moto) && <>
						<MyCheckboxGroup
							checkboxKey='s-'
							label={ t('season') }
							slug={ slug }
							section={ section }
							options={ customTireSeason.map(item => ({
								value: item.value,
								label: locale === Language.UK ? item.name_ua : item.name
							})) }
						/>
						{ slug && slug.some(item => ['zimovi', 'shipovani'].includes(item)) &&
							<Link
								className='ml-8 mt-2 flex'
								onClick={ () => dispatch(setProgress(true)) }
								href={ `/katalog/${ section }/${ slug ? slug.filter(item => !['zimovi', 'shipovani'].includes(item)).join('/') : '' }/${ slug?.includes('shipovani') ? 'zimovi' : 'shipovani' }` }>
								<Checkbox className="-z-10" radius="none" size="lg" isSelected={ slug?.includes('shipovani') }>
									Шип
								</Checkbox>
							</Link> }
					</> }
					{ section === Section.Cargo && <MyCheckboxGroup
						checkboxKey='vt-'
						label={ t('appointment') }
						slug={ slug }
						section={ section }
						options={ appointmentCargo.map(item => ({
							value: item.value,
							label: locale === Language.UK ? item.name_ua : item.name
						})) }
					/> }
					{ section === Section.Spectehnika && <MyCheckboxGroup
						checkboxKey='vt-'
						label={ t('appointment') }
						slug={ slug }
						section={ section }
						options={ appointmentIndustrial.map(item => ({
							value: item.value,
							label: locale === Language.UK ? item.name_ua : item.name
						})) }
					/> }
					{ (section === Section.Tires || section === Section.Moto || section === Section.Cargo || section === Section.Spectehnika) && <>
						<MyCheckboxGroup
							checkboxKey='b-'
							label={ t('brand') }
							slug={ slug }
							section={ section }
							options={ filters?.brand?.map(item => ({ value: `${ item.value }`, label: item.label })) || [] }
						/>
					</> }
					{ section === Section.Disks && <>
						<MyCheckboxGroup
							checkboxKey='kr-'
							label={ t('fasteners') }
							slug={ slug }
							section={ section }
							options={ filters?.krip?.map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<SelectFromTo name='et' nameMin='etMin' nameMax='etMax' minus={ true } from={ -140 } to={ 500 }
													title={ `ET(${ t('departure') })` } btnTitle={ t('to apply') }/>
						<SelectFromTo name='dia' nameMin='diaMin' nameMax='diaMax' from={ 46 } to={ 500 } title='DIA'
													btnTitle={ t('to apply') }/>
						<MyCheckboxGroup
							checkboxKey='td-'
							label={ t('type') }
							slug={ slug }
							section={ section }
							options={ typeDisc.map(item => ({
								value: item.value,
								label: locale === Language.UK ? item.name_ua : item.name
							})) }
						/>
						<MyCheckboxGroup
							checkboxKey='clr-'
							label={ t('color') }
							slug={ slug }
							section={ section }
							options={ filters?.colir_abbr?.map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='b-'
							label={ t('brand') }
							slug={ slug }
							section={ section }
							options={ filters?.brand_disc?.map(item => ({ value: `${ item.value }`, label: item.label })) || [] }
						/>
					</> }
					{ (section === Section.Tires || section === Section.Moto || section === Section.Cargo || section === Section.Spectehnika) && <>
						<MyCheckboxGroup
							checkboxKey='ctr-'
							label={ t('country') }
							slug={ slug }
							section={ section }
							options={ country?.map(item => ({ value: item.value, label: item.label })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='y-'
							label={ t('year') }
							slug={ slug }
							section={ section }
							options={ filters?.tyre_year?.map(item => ({
								value: `${ item.value }`,
								label: `${ item.label }`
							})) || [] }
						/>
					</> }
					<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
												title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
					{ section === Section.Battery && <>
						<SelectFromTo name='sirina' nameMin='minShirina' nameMax='maxShirina' from={ 0 } to={ 600 }
													title={ `${ t('width') } (см)` }
													btnTitle={ t('to apply') }/>
						<SelectFromTo name='visota' nameMin='minVisota' nameMax='maxVisota' from={ 0 } to={ 190 }
													title={ `${ t('height') } (см)` }
													btnTitle={ t('to apply') }/>
						<SelectFromTo name='dovzina' nameMin='minDovzina' nameMax='maxDovzina' from={ 0 } to={ 600 }
													title={ `Довжина (см)` } btnTitle={ t('to apply') }/>
						<MyCheckboxGroup
							checkboxKey='am-'
							label={ t('high-voltage') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.napruga.map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='pl-'
							label={ t('polarity') }
							slug={ slug }
							section={ section }
							options={ filtersAkum?.poliarnist.map(item => ({
								value: item.value,
								label: item.value,
								p: item.p
							})) || [] }
						/>
					</> }
					{ section === Section.Tires && <>
						<MyCheckboxGroup
							checkboxKey='li-'
							label={ t('load index') }
							slug={ slug }
							section={ section }
							options={ filters?.load.map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='si-'
							label={ t('speed index') }
							slug={ slug }
							section={ section }
							options={ filters?.speed.map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<MyCheckboxGroup
							checkboxKey='hm-'
							label={ t('homologation') }
							slug={ slug }
							section={ section }
							options={ filters?.omolog.map(item => ({ value: item.value, label: item.value })) || [] }
						/>
						<CheckboxGroup
							defaultValue={ [slug?.includes('oc-1') ? 'oc-1' : '', slug?.includes('xl-1') ? 'xl-1' : '', slug?.includes('owl-1') ? 'owl-1' : '', slug?.includes('rf-1') ? 'rf-1' : '', slug?.includes('ofr-1') ? 'ofr-1' : ''] }
							label={ t('other') }
							classNames={ { label: 'mt-4 font-bold text-black' } }
							orientation='vertical'
						>
							<Link
								className='w-full flex mt-2'
								onClick={ () => dispatch(setProgress(true)) }
								href={ `/katalog/${ section }/${slug ? slug.includes('oc-1') ? slug.filter(i => i !== 'oc-1').join('/') : `${slug.join('/')}/oc-1` : '/oc-1'}` }
							>
								<Checkbox className='-z-10' radius='none' size='lg' value='oc-1'>
									C
								</Checkbox>
							</Link>
							<Link
								className='w-full flex mt-2'
								onClick={ () => dispatch(setProgress(true)) }
								href={ `/katalog/${ section }/${slug ? slug.includes('xl-1') ? slug.filter(i => i !== 'xl-1').join('/') : `${slug.join('/')}/xl-1` : '/xl-1'}` }
							>
								<Checkbox className='-z-10' radius='none' size='lg' value='xl-1'>
									XL
								</Checkbox>
							</Link>
							<Link
								className='w-full flex mt-2'
								onClick={ () => dispatch(setProgress(true)) }
								href={ `/katalog/${ section }/${slug ? slug.includes('owl-1') ? slug.filter(i => i !== 'owl-1').join('/') : `${slug.join('/')}/owl-1` : '/owl-1'}` }
							>
								<Checkbox className='-z-10' radius='none' size='lg' value='owl-1'>
									{ locale === Language.UK ? 'OWL (белые буквы)' : 'OWL (білі букви)' }
								</Checkbox>
							</Link>
							<Link
								className='w-full flex mt-2'
								onClick={ () => dispatch(setProgress(true)) }
								href={ `/katalog/${ section }/${slug ? slug.includes('rf-1') ? slug.filter(i => i !== 'rf-1').join('/') : `${slug.join('/')}/rf-1` : '/rf-1'}` }
							>
								<Checkbox className='-z-10' radius='none' size='lg' value='rf-1'>
									RunFlat
								</Checkbox>
							</Link>
							<Link
								className='w-full flex mt-2'
								onClick={ () => dispatch(setProgress(true)) }
								href={ `/katalog/${ section }/${slug ? slug.includes('ofr-1') ? slug.filter(i => i !== 'ofr-1').join('/') : `${slug.join('/')}/ofr-1` : '/ofr-1'}` }
							>
								<Checkbox className='-z-10' radius='none' size='lg' value='ofr-1'>
									Off-Road 4x4
								</Checkbox>
							</Link>
						</CheckboxGroup>
					</> }
				</div>
			</div>
			<Drawer isOpen={ isOpen } placement='left' onOpenChange={ onOpenChange }>
				<DrawerContent>
					{ () => (
						<>
							{(section === Section.Tires || section === Section.Disks) && <div
								className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
								<SwitchTabs section={ section }/>
							</div>}
							<div
								className='relative mt-8 pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
								{ (section === Section.Tires || section === Section.Disks) && <SwitchTabsByParams subsection={ subsection }/> }
								{ subsection === Subsection.ByParams && <>
									{ (section === Section.Tires || section === Section.Cargo || section === Section.Spectehnika || section === Section.Moto) && <>
										{ renderSelect(
											'width',
											'width',
											'gray',
											filterData?.tyre_width.map(item => ({ value: item.value, label: item.value, p: item.p })),
											'175',
											filter?.width,
											true,
										) }
										{ section === Section.Tires && renderSelect(
											'height',
											'height',
											'gray',
											filterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p })),
											'45',
											filter?.height,
											true,
										) }
										{ renderSelect(
											'radius',
											'diameter',
											'gray',
											filterData?.tyre_diameter?.map(item => ({
												value: item.value,
												label: `R${ item.value }`,
												p: item.p
											})),
											'R14',
											filter?.radius,
											true,
										) }
									</> }
									{ section === Section.Disks && <>
										{ renderSelect(
											'width',
											'width',
											'gray',
											filterData?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p })),
											false,
											filter?.width,
											true,
										) }
										{ renderSelect(
											'radius',
											'diameter',
											'gray',
											filterData?.disc_diameter?.map(item => ({
												value: item.value,
												label: `R${ item.value }`,
												p: item.p
											})),
											false,
											filter?.radius,
											true,
										) }
									</> }
								</> }
								{ subsection === 'byCars' && <ByCar data={ filters }/> }
								{ section === Section.Battery && <>
									{ renderSelect(
										'jemnist',
										'capacity',
										'gray',
										filtersAkum?.jemnist.map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.jemnist,
										true,
									) }
									{ renderSelect(
										'puskovii_strum',
										'starting current',
										'gray',
										filtersAkum?.['puskovii-strum'].map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.puskovii_strum,
										true,
									) }
									{ renderSelect(
										'tip_elektrolitu',
										'type of electrolyte',
										'gray',
										filtersAkum?.['tip-elektrolitu'].map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.tip_elektrolitu,
									) }
									{ renderSelect(
										'tip_korpusu',
										'body type',
										'white',
										filtersAkum?.['tip-korpusu'].map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.tip_korpusu,
									) }
									{ renderSelect(
										'brand',
										'brand',
										'white',
										filtersAkum?.brand_akum?.map(item => ({ value: item.value, label: item.label })),
										false,
										filter?.brand && Number(filter.brand),
										true,
									) }
								</> }
								{ (section === Section.Tires || section === Section.Moto) && <>
									{renderSelect(
										'sezon',
										'season',
										'white',
										customTireSeason.map(item => ({
											value: item.value,
											label: locale === Language.UK ? item.name_ua : item.name
										})),
										false,
										filter?.sezon,
										false,
										filter?.only_studded
									)}
								</> }
								{ section === Section.Cargo && renderSelect(
									'vehicle_type',
									'appointment',
									'white',
									appointmentCargo.map(item => ({
										value: item.value,
										label: locale === Language.UK ? item.name_ua : item.name
									})),
									false,
									filter?.vehicle_type,
								) }
								{ section === Section.Spectehnika && renderSelect(
									'vehicle_type',
									'appointment',
									'white',
									appointmentIndustrial.map(item => ({
										value: item.value,
										label: locale === Language.UK ? item.name_ua : item.name
									})),
									false,
									filter?.vehicle_type,
								) }
								{ (section === Section.Tires || section === Section.Moto || section === Section.Cargo || section === Section.Spectehnika) && <>
									{ renderSelect(
										'brand',
										'brand',
										'white',
										filters?.brand?.map(item => ({ value: item.value, label: item.label })),
										false,
										filter?.brand && Number(filter.brand),
										true,
									) }
								</> }
								{ section === Section.Disks && <>
									{ renderSelect(
										'krepeg',
										'fasteners',
										'white',
										filters?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.krepeg,
										true,
									) }
									<SelectFromTo name='et' nameMin='etMin' nameMax='etMax' minus={ true } from={ -140 } to={ 500 }
																title={ `ET(${ t('departure') })` } btnTitle={ t('to apply') }/>
									<SelectFromTo name='dia' nameMin='diaMin' nameMax='diaMax' from={ 46 } to={ 500 } title='DIA'
																btnTitle={ t('to apply') }/>
									{ renderSelect(
										'typedisk',
										'type',
										'gray',
										typeDisc.map(item => ({
											value: item.value,
											label: locale === Language.UK ? item.name_ua : item.name
										})),
										false,
										filter?.typedisk,
									) }
									{ renderSelect(
										'colir',
										'color',
										'white',
										filters?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.colir,
										true,
									) }
									{ renderSelect(
										'brand',
										'brand',
										'white',
										filters?.brand_disc?.map(item => ({ value: item.value, label: item.label })),
										false,
										filter?.brand && Number(filter.brand),
										true,
									) }
								</> }
								{ (section === Section.Tires || section === Section.Moto || section === Section.Cargo || section === Section.Spectehnika) && renderSelect(
									'country',
									'country',
									'white',
									country?.map(item => ({ value: item.value, label: item.label })),
									false,
									filter?.country,
									true,
								) }
								{ (section === Section.Tires || section === Section.Moto || section === Section.Cargo || section === Section.Spectehnika) && renderSelect(
									'year',
									'year',
									'gray',
									filters?.tyre_year?.map(item => ({ value: item.value, label: item.label })),
									false,
									filter?.year && (filter.year),
								) }
								<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
															title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
								{ section === Section.Battery && <>
									<SelectFromTo name='sirina' nameMin='minShirina' nameMax='maxShirina' from={ 0 } to={ 600 }
																title={ `${ t('width') } (см)` }
																btnTitle={ t('to apply') }/>
									<SelectFromTo name='visota' nameMin='minVisota' nameMax='maxVisota' from={ 0 } to={ 190 }
																title={ `${ t('height') } (см)` }
																btnTitle={ t('to apply') }/>
									<SelectFromTo name='dovzina' nameMin='minDovzina' nameMax='maxDovzina' from={ 0 } to={ 600 }
																title={ `Довжина (см)` } btnTitle={ t('to apply') }/>
									{ renderSelect(
										'napruga',
										'high-voltage',
										'gray',
										filtersAkum?.napruga.map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.napruga,
									) }
									{ renderSelect(
										'poliarnist',
										'polarity',
										'white',
										filtersAkum?.poliarnist.map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.poliarnist,
									) }
								</> }
								{ section === Section.Tires && <>
									{ renderSelect(
										'li',
										'load index',
										'white',
										filters?.load.map(item => ({ value: item.value, label: item.value })),
										false,
										filter?.li,
										true,
									) }
									{ renderSelect(
										'si',
										'speed index',
										'white',
										filters?.speed.map(item => ({ value: item.value, label: item.value })),
										false,
										filter?.si,
										true,
									) }
									{ renderSelect(
										'omolog',
										'homologation',
										'white',
										filters?.omolog.map(item => ({ value: item.value, label: item.value })),
										false,
										filter?.omolog,
										true,
									) }
									{ renderSelect(
										'other',
										'other',
										'white',
										others.map(item => ({
											value: item.value,
											label: locale === Language.UK ? item.name_ua : item.name
										})),
										false,
										null,
										false,
										null,
										{
											only_c: filter?.only_c ?? null,
											only_xl: filter?.only_xl ?? null,
											only_owl: filter?.only_owl ?? null,
											only_run_flat: filter?.only_run_flat ?? null,
											only_off_road: filter?.only_off_road ?? null,
										}
									) }
								</> }
							</div>
						</>
					) }
				</DrawerContent>
			</Drawer>
		</div>
	)
};

export default FilterAlt;
