'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setParams } from '@/store/slices/filterSlice';
import { Drawer, DrawerContent } from '@heroui/drawer';
import { useDisclosure } from '@heroui/modal';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import Select from './Select';
import { Section, Subsection } from '@/models/filter';
import type { BaseDataProps, Options } from '@/models/baseData';
import { SubmitFloat } from '@/components/Catalog/FilterAlt/SubmitFloat';
import { Language } from '@/models/language';
import { appointmentCargo, appointmentIndustrial, customTireSeason, others, typeDisc } from './customParamForSelector';
import { baseDataAPI } from '@/services/baseDataService';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { Button } from '@heroui/button';
import * as Icons from '@/components/UI/Icons';

const cargoTypes = [ '3', '4', '5', '6' ];
const industrialTypes = [ '9', '10', '11' ];

interface Props {
	locale: Language
	filterData: BaseDataProps | undefined
	section: Section
}

const FilterAlt: FC<Props> = ({ locale, filterData, section }) => {
	const t = useTranslations('Filters');
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const dispatch = useAppDispatch();
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const appointmentCargoShow = filter.vehicle_type && cargoTypes.includes(filter.vehicle_type);
	const appointmentIndustrialShow = filter.vehicle_type && industrialTypes.includes(filter.vehicle_type);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const country = locale === Language.UK ? data?.country : data?.country_ru;

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
			<Button variant='light' onPress={ onOpen } className='font-bold lg:hidden text-medium' startContent={ <Icons.FilterIcon className='fill-black' /> } >{ t('filters') }</Button>
			<div className='hidden md:block'>
				{ section !== Section.Battery && <div
					className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
					<SwitchTabs section={ section }/>
				</div> }
				<div
					className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
					<SubmitFloat element={ element } btnTitle={ t('to apply') } setElement={ setElement } offset={ Section.Battery ? 294 : 340 }/>
					{ section !== Section.Battery && <SwitchTabsByParams subsection={ subsection }/> }
					{ subsection === Subsection.ByParams && <>
						{ section === Section.Tires && <>
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
								filterData?.tyre_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })),
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
								filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })),
								false,
								filter?.radius,
								true,
							) }
						</> }
					</> }
					{ subsection === 'byCars' && <ByCar data={ data }/> }
					{section === Section.Battery && <>
						{renderSelect(
							'jemnist',
							'capacity',
							'gray',
							dataAkum?.jemnist.map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.jemnist,
							true,
						)}
						{renderSelect(
							'puskovii_strum',
							'starting current',
							'gray',
							dataAkum?.['puskovii-strum'].map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.puskovii_strum,
							true,
						)}
						{renderSelect(
							'tip_elektrolitu',
							'type of electrolyte',
							'gray',
							dataAkum?.['tip-elektrolitu'].map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.tip_elektrolitu,
						)}
						{renderSelect(
							'tip_korpusu',
							'body type',
							'white',
							dataAkum?.['tip-korpusu'].map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.tip_korpusu,
						)}
						{renderSelect(
							'brand',
							'brand',
							'white',
							dataAkum?.brand_akum?.map(item => ({value: item.value, label: item.label})),
							false,
							filter?.brand && Number(filter.brand),
							true,
						)}
					</>}
					{ section === Section.Tires && <>
						{ !appointmentCargoShow && !appointmentIndustrialShow && renderSelect(
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
						) }
						{ appointmentCargoShow && renderSelect(
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
						{ appointmentIndustrialShow && renderSelect(
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
						{ renderSelect(
							'brand',
							'brand',
							'white',
							data?.brand?.map(item => ({ value: item.value, label: item.label })),
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
							data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })),
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
							typeDisc.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })),
							false,
							filter?.typedisk,
						) }
						{ renderSelect(
							'colir',
							'color',
							'white',
							data?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })),
							false,
							filter?.colir,
							true,
						) }
						{ renderSelect(
							'brand',
							'brand',
							'white',
							data?.brand_disc?.map(item => ({ value: item.value, label: item.label })),
							false,
							filter?.brand && Number(filter.brand),
							true,
						) }
					</> }
					{section === Section.Tires && renderSelect(
						'country',
						'country',
						'white',
						country?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.country,
						true,
					)}
					{section === Section.Tires && renderSelect(
						'year',
						'year',
						'gray',
						data?.tyre_year?.map(item => ({value: item.value, label: item.label})),
						false,
						filter?.year && (filter.year),
					)}
					<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
												title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
					{section === Section.Battery && <>
						<SelectFromTo name='sirina' nameMin='minShirina' nameMax='maxShirina' from={0} to={600} title={`${t('width')} (см)`}
													btnTitle={t('to apply')} />
						<SelectFromTo name='visota' nameMin='minVisota' nameMax='maxVisota' from={0} to={190} title={`${t('height')} (см)`}
													btnTitle={t('to apply')} />
						<SelectFromTo name='dovzina' nameMin='minDovzina' nameMax='maxDovzina' from={0} to={600}
													title={`Довжина (см)`} btnTitle={t('to apply')} />
						{renderSelect(
							'napruga',
							'high-voltage',
							'gray',
							dataAkum?.napruga.map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.napruga,
						)}
						{renderSelect(
							'poliarnist',
							'polarity',
							'white',
							dataAkum?.poliarnist.map(item => ({value: item.value, label: item.value, p: item.p})),
							false,
							filter?.poliarnist,
						)}
					</>}
					{ section === Section.Tires && <>
						{ renderSelect(
							'li',
							'load index',
							'white',
							data?.load.map(item => ({ value: item.value, label: item.value })),
							false,
							filter?.li,
							true,
						) }
						{ renderSelect(
							'si',
							'speed index',
							'white',
							data?.speed.map(item => ({ value: item.value, label: item.value })),
							false,
							filter?.si,
							true,
						) }
						{ renderSelect(
							'omolog',
							'homologation',
							'white',
							data?.omolog.map(item => ({ value: item.value, label: item.value })),
							false,
							filter?.omolog,
							true,
						) }
						{ renderSelect(
							'other',
							'other',
							'white',
							others.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })),
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
			</div>
			<Drawer isOpen={ isOpen } placement='left' onOpenChange={ onOpenChange }>
				<DrawerContent>
					{ () => (
						<>
							<div
								className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
								<SwitchTabs section={ section }/>
							</div>
							<div
								className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
								{ section !== Section.Battery && <SwitchTabsByParams subsection={ subsection }/> }
								{ subsection === Subsection.ByParams && <>
									{ section === Section.Tires && <>
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
											filterData?.tyre_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })),
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
											filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })),
											false,
											filter?.radius,
											true,
										) }
									</> }
								</> }
								{ subsection === 'byCars' && <ByCar data={ data }/> }
								{section === Section.Battery && <>
									{renderSelect(
										'jemnist',
										'capacity',
										'gray',
										dataAkum?.jemnist.map(item => ({value: item.value, label: item.value, p: item.p})),
										false,
										filter?.jemnist,
										true,
									)}
									{renderSelect(
										'puskovii_strum',
										'starting current',
										'gray',
										dataAkum?.['puskovii-strum'].map(item => ({value: item.value, label: item.value, p: item.p})),
										false,
										filter?.puskovii_strum,
										true,
									)}
									{renderSelect(
										'tip_elektrolitu',
										'type of electrolyte',
										'gray',
										dataAkum?.['tip-elektrolitu'].map(item => ({value: item.value, label: item.value, p: item.p})),
										false,
										filter?.tip_elektrolitu,
									)}
									{renderSelect(
										'tip_korpusu',
										'body type',
										'white',
										dataAkum?.['tip-korpusu'].map(item => ({value: item.value, label: item.value, p: item.p})),
										false,
										filter?.tip_korpusu,
									)}
									{renderSelect(
										'brand',
										'brand',
										'white',
										dataAkum?.brand_akum?.map(item => ({value: item.value, label: item.label})),
										false,
										filter?.brand && Number(filter.brand),
										true,
									)}
								</>}
								{ section === Section.Tires && <>
									{ !appointmentCargoShow && !appointmentIndustrialShow && renderSelect(
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
									) }
									{ appointmentCargoShow && renderSelect(
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
									{ appointmentIndustrialShow && renderSelect(
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
									{ renderSelect(
										'brand',
										'brand',
										'white',
										data?.brand?.map(item => ({ value: item.value, label: item.label })),
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
										data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })),
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
										typeDisc.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })),
										false,
										filter?.typedisk,
									) }
									{ renderSelect(
										'colir',
										'color',
										'white',
										data?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })),
										false,
										filter?.colir,
										true,
									) }
									{ renderSelect(
										'brand',
										'brand',
										'white',
										data?.brand_disc?.map(item => ({ value: item.value, label: item.label })),
										false,
										filter?.brand && Number(filter.brand),
										true,
									) }
								</> }
								{section === Section.Tires && renderSelect(
									'country',
									'country',
									'white',
									country?.map(item => ({value: item.value, label: item.label})),
									false,
									filter?.country,
									true,
								)}
								{section === Section.Tires && renderSelect(
									'year',
									'year',
									'gray',
									data?.tyre_year?.map(item => ({value: item.value, label: item.label})),
									false,
									filter?.year && (filter.year),
								)}
								<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
															title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
								{section === Section.Battery && <>
									<SelectFromTo name='sirina' nameMin='minShirina' nameMax='maxShirina' from={0} to={600} title={`${t('width')} (см)`}
																btnTitle={t('to apply')} />
									<SelectFromTo name='visota' nameMin='minVisota' nameMax='maxVisota' from={0} to={190} title={`${t('height')} (см)`}
																btnTitle={t('to apply')} />
									<SelectFromTo name='dovzina' nameMin='minDovzina' nameMax='maxDovzina' from={0} to={600}
																title={`Довжина (см)`} btnTitle={t('to apply')} />
									{renderSelect(
										'napruga',
										'high-voltage',
										'gray',
										dataAkum?.napruga.map(item => ({value: item.value, label: item.value, p: item.p})),
										false,
										filter?.napruga,
									)}
									{renderSelect(
										'poliarnist',
										'polarity',
										'white',
										dataAkum?.poliarnist.map(item => ({value: item.value, label: item.value, p: item.p})),
										false,
										filter?.poliarnist,
									)}
								</>}
								{ section === Section.Tires && <>
									{ renderSelect(
										'li',
										'load index',
										'white',
										data?.load.map(item => ({ value: item.value, label: item.value })),
										false,
										filter?.li,
										true,
									) }
									{ renderSelect(
										'si',
										'speed index',
										'white',
										data?.speed.map(item => ({ value: item.value, label: item.value })),
										false,
										filter?.si,
										true,
									) }
									{ renderSelect(
										'omolog',
										'homologation',
										'white',
										data?.omolog.map(item => ({ value: item.value, label: item.value })),
										false,
										filter?.omolog,
										true,
									) }
									{ renderSelect(
										'other',
										'other',
										'white',
										others.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })),
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
