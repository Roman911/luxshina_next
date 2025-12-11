'use client';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Language } from '@/models/language';
import { Button } from '@heroui/react';
import * as Icons from '../../UI/Icons';
import { Section } from '@/models/filter';
import { Link } from '@/i18n/routing';
import { twMerge } from 'tailwind-merge';
import { VehicleTypeTransform } from '@/lib/characteristicsTransform';
import type { Brand } from '@/models/baseData';
import { baseDataAPI } from '@/services/baseDataService';
import { getModel } from '@/lib/brand';

interface FilterActiveProps {
	brand: Brand | null | undefined
	locale: Language
	className: string
	slug?: string[]
	section: Section
}

const validItems = ['litni', 'zimovi', 'vsesezonnye', 'shipovani', 'off-road-4x4', 'legkovi', 'pozashlyahoviki', 'busi', 'liti', 'stalni', 'kovani'];

const FilterActive: FC<FilterActiveProps> = ({ brand, className, slug = [], section }) => {
	const [ loading, setLoading ] = useState(false);
	const [ loadingBtn, setLoadingBtn ] = useState<number | null>(null);
	const t = useTranslations('Filters');
	const { data: manufModels } = baseDataAPI.useFetchManufModelsQuery(`${ brand?.value }`);
	const model = getModel(slug, manufModels);

	function removeKeyAndNextImmutable(arr: string[], keys: string[]) {
		const result = [];
		let skip = 0;

		for (let i = 0; i < arr.length; i++) {
			if (skip > 0) {
				skip--;
				continue;
			}

			if (keys.includes(arr[i])) {
				skip = 1; // пропускаємо наступний елемент
				continue;
			}

			result.push(arr[i]);
		}

		return result;
	}

	const result = removeKeyAndNextImmutable(slug, ["model", "brand"]);

	const renderItem = (key: number, value: string, label: string, isBrand?: boolean, isModal?: boolean) => {
		const id = `${key}-${value}`
		const values = isBrand ? removeKeyAndNextImmutable(slug, ["model", "brand"]) : isModal ? slug?.filter(item => item !== 'model') : slug;

		return (
			<Button
				key={ id }
				as={ Link }
				size='sm'
				radius='full'
				isLoading={ key === loadingBtn }
				onPress={ () => setLoadingBtn(key) }
				href={ `/katalog/${section}/${values?.filter(item => item !== value).join('/')}` }
				endContent={ <span className='bg-[#A8AFB6] rounded-full p-1'><Icons.CloseIcon className="stroke-[#393939] h-3 w-3"/></span> }
				className="bg-[#393939] text-white text-sm font-medium pr-1"
			>
				{ label }
			</Button>
		);
	};

	return (
		<div
			className={
				twMerge('mb-3 flex-wrap gap-x-2 gap-y-3 lg:gap-4 text-end lg:bg-transparent p-4 lg:p-0', className,
					slug?.length !== 0 && 'bg-blue-50')
			}>
			{ slug && slug.length !== 0 && <Button
				as={ Link }
				onPress={ () => setLoading(true) }
				href={ `/katalog/${section}` }
				variant="light"
				size="sm"
				radius='full'
				isLoading={ loading }
				className='text-sm font-medium text-gray-500'
				endContent={ <span className='bg-[#B9B9BA] rounded-full p-1.5 hidden lg:block'><Icons.CloseIcon className='stroke-white h-3 w-3'/></span> }
			>
				{ t('reset everything') }
			</Button> }
			{ brand && renderItem(0, brand.alias, brand.label, true)}
			{ model && renderItem(1, model.alias, model.label, false, true)}
			{ result && result.length !== 0 && result?.map((item, key) => {
				const split = item.split('-') || '';

				if(split && split[0] === 'p') {
					return ;
				}

				if(split && split[0] === 'pfrom') {
					return renderItem(key, item, `${t('from')} ${split[1]} грн`);
				}

				if(split && split[0] === 'pto') {
					return renderItem(key, item, `${t('to')} ${split[1]} грн`);
				}

				if(validItems.includes(item)) {
					return renderItem(key, item, t(item));
				}

				if(split && split[0] === 'vt') {
					return renderItem(key, item, t(VehicleTypeTransform(split[1])?.name || '1'));
				}

				return renderItem(key, item, decodeURIComponent(split[1]));
			}) }
		</div>
	)
};

export default FilterActive;
