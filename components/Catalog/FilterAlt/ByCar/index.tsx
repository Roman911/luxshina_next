import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import MySelect from '@/components/UI/Select';
import type { BaseDataProps } from '@/models/baseData';
import { baseDataAPI } from '@/services/baseDataService';
import { Button } from '@heroui/react';
import { Section } from '@/models/filter';

interface CarFilters {
	brand: string | number;
	model: string | number;
	year: string | number;
	modification: string | number;
}

interface Props {
	data: BaseDataProps | undefined
	car: string | null
	section: Section
}

const ByCar: FC<Props> = ({ data, car, section } ) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const t = useTranslations('Filters');
	const [ filter, setFilter ] = useState<CarFilters>({ brand: 0, model: 0, modification: 0, year: 0 });
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(`${filter.brand}`);
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(`${filter.model}`);
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(`${filter.model}/${filter.year}`);
	const { data: dataModification } = baseDataAPI.useFetchKitTyreSizeQuery(`${ filter.modification }`);
	const { data: dataDisksModification } = baseDataAPI.useFetchKitDiskSizeQuery(`${ filter.modification }`);

	useEffect(() => {
		if(car) {
			const numbers = car.split('-').filter(part => /^\d+$/.test(part)).map(Number);
			if(numbers.length > 2) {
				setFilter({ brand: numbers[1], model: numbers[2], modification: numbers[3], year: numbers[0] });
			} else {
				setFilter({ brand: numbers[0], model: 0, modification: 0, year: 0 });
			}
		}
	}, [car]);

	const onChangeByCar = (name: string, value: number | string | null) => {
		setFilter({ ...filter, [name]: value });
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	}

	const handleClick = () => {
		const brandLabel = data?.auto.find(item => item.value == filter.brand)?.label.toLowerCase() ?? '';
		const link = `car-${ brandLabel } ${ filter.year } ${ filter.brand } ${ filter.model } ${ filter.modification }`;
		const paramsTires = `/w-${ dataModification?.[0].width }/h-${ dataModification?.[0].height }/d-${ dataModification?.[0].diameter }`;
		const paramsDisks = `/w-${ dataDisksModification?.[0].width }/d-${ dataDisksModification?.[0].diameter }/kr-${ dataDisksModification?.[0].kits.bolt_count }x${ dataDisksModification?.[0].kits.pcd }/et-${ dataDisksModification?.[0].et }/dia-${ dataDisksModification?.[0].kits.dia }`;
		router.push(`/katalog/${ section }/${ link.split(' ').join('-') }${ section === Section.Tires ? paramsTires : paramsDisks }`);
		dispatch(setProgress(true));
	}

	return (
		<>
			<div className='mt-2'>
				<MySelect
					name='brand'
					label={ t('car brand') }
					options={ data?.auto?.map(item => ({ value: item.value, label: item.label })) }
					onChange={ onChangeByCar }
					defaultValue={ filter.brand ? filter.brand.toString() : '' }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='model'
					label={ t('model') }
					options={ model?.map(item => ({ value: item.value, label: item.label })) }
					isDisabled={ model?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filter.model ? filter.model.toString() : '' }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='year'
					label={ t('graduation year') }
					options={ modelYear?.map(item => ({ value: item, label: `${item}` })) }
					isDisabled={ modelYear?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filter.year ? filter.year.toString() : '' }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='modification'
					label={ t('modification') }
					options={ modelKit?.map(item => ({ value: item.value, label: item.label })) }
					isDisabled={ modelKit?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filter.modification ? filter.modification.toString() : '' }
				/>
			</div>
			<div className='mt-4'>
				<Button color='primary' onPress={ handleClick } size='md' radius='full' className='w-full uppercase font-bold' >
					{ t('choose') }
				</Button>
			</div>
		</>
	)
};

export default ByCar;
