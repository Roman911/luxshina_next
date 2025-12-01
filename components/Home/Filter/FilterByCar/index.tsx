'use client'
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import MySelect from '../Select';
import { Section } from '@/models/filter';
import { Button } from '@heroui/react';

interface CarFilters {
	brand?: string | number;
	model?: string | number;
	year?: string | number;
	modification?: string | number;
}

interface FilterConfig {
	label: string;
	name: keyof typeof filterNames;
	options?: Array<{ value: string | number; label: string }>;
	isDisabled?: boolean;
}

const filterNames = {
	brand: 'brand',
	model: 'model',
	year: 'graduation year',
	modification: 'modification',
} as const;

const FilterByCar = () => {
	const [ isLoadingTires, setLoadingTires ] = useState(false);
	const [ isLoadingDisks, setLoadingDisks ] = useState(false);
	const [ carFilters, setCarFilters ] = useState<CarFilters>({ brand: 0, model: 0, modification: 0, year: 0 });
	const router = useRouter();
	const t = useTranslations('Filters');
	const { data: baseData } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(carFilters.brand?.toString() ?? '');
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(carFilters.model?.toString() ?? '');
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(
		`${ carFilters.model }/${ carFilters.year }`
	);
	const { data: dataModification } = baseDataAPI.useFetchKitTyreSizeQuery(`${ carFilters.modification }`);
	const { data: dataDisksModification } = baseDataAPI.useFetchKitDiskSizeQuery(`${ carFilters.modification }`);

	const filters: FilterConfig[] = useMemo(() => [
		{
			label: filterNames.brand,
			name: 'brand',
			options: baseData?.auto?.map(item => ({ value: item.value, label: item.label }))
		},
		{
			label: filterNames.model,
			name: 'model',
			options: model?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: !model?.length,
		},
		{
			label: filterNames.year,
			name: 'year',
			options: modelYear?.map(item => ({ value: item, label: String(item) })),
			isDisabled: !modelYear?.length,
		},
		{
			label: filterNames.modification,
			name: 'modification',
			options: modelKit?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: !modelKit?.length,
		}
	], [ baseData?.auto, model, modelYear, modelKit ]);

	const handleChange = useCallback((name: string, value: number | string | null) => {
		setCarFilters({ ...carFilters, [name]: value })
		if(name === 'model') {
			modelRefetch();
		} else if([ 'modification', 'year' ].includes(name)) {
			modelKitRefetch();
		}
	}, [ carFilters, modelRefetch, modelKitRefetch ]);

	const handleSubmit = useCallback((selectedSection: Section) => {
		const brandLabel = baseData?.auto.find(item => item.value == carFilters.brand)?.label.toLowerCase() ?? '';
		const link = `car-${ brandLabel } ${ carFilters.year } ${ carFilters.brand } ${ carFilters.model } ${ carFilters.modification }`;
		const paramsTires = `/w-${ dataModification?.[0].width }/h-${ dataModification?.[0].height }/d-${ dataModification?.[0].diameter }`;
		const paramsDisks = `/w-${ dataDisksModification?.[0].width }/d-${ dataDisksModification?.[0].diameter }/kr-${ dataDisksModification?.[0].kits.bolt_count }x${ dataDisksModification?.[0].kits.pcd }/et-${ dataDisksModification?.[0].et }/dia-${ dataDisksModification?.[0].kits.dia }`;
		(selectedSection === Section.Disks ? setLoadingDisks : setLoadingTires)(true);
		router.push(`/katalog/${ selectedSection }/${ link.split(' ').join('-') }${ selectedSection === Section.Tires ? paramsTires : paramsDisks }`);
	}, [baseData?.auto, carFilters, dataDisksModification, dataModification, router]);

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2.5 md:mt-7'>
				{ filters.map(({ name, label, options, isDisabled }) => (
					<MySelect
						key={ name }
						name={ name }
						label={ label }
						options={ options }
						onChange={ handleChange }
						isDisabled={ isDisabled }
					/>
				)) }
			</div>
			<div className='mt-4 md:mt-10 flex gap-4 flex-col md:flex-row justify-center'>
				{ [
					{ section: Section.Tires, label: 'choose tires', isLoading: isLoadingTires },
					{ section: Section.Disks, label: 'choose disks', isLoading: isLoadingDisks }
				].map(({ section: btnSection, label, isLoading }) => (
					<Button
						key={ btnSection }
						radius='full' size='lg'
						isDisabled={ !carFilters.modification }
						isLoading={ isLoading }
						onPress={ () => handleSubmit(btnSection) }
						className='w-full md:w-56 uppercase'
					>
						{ t(label) }
					</Button>
				)) }
			</div>
		</>
	)
};

export default FilterByCar;
