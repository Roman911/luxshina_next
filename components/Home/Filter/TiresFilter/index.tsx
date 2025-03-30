import { ComponentType, FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import Select from '../Select';
import * as Icons from '@/components/UI/Icons';
import type { FilterProps } from '@/models/filterHomePage';
import { twMerge } from 'tailwind-merge';

interface IconsMap {
	[key: string]: ComponentType
}

const buttons = [
	{ id: 2, icon: 'snow' },
	{ id: 1, icon: 'sun' },
	{ id: 3, icon: 'cloud' },
];

const icons: IconsMap = {
	snow: Icons.SnowIcon,
	sun: Icons.SunIcon,
	cloud: Icons.CloudIcon,
};

const TiresFilter: FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
	const [ season, setSeason ] = useState<null | number>(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const t = useTranslations('HeaderFilter');

	const handleClick = (value: number) => {
		setSeason(value);
		onChange('sezon', value);
	}

	const onClick = () => {
		setIsLoading(true);
		onSubmit();
	}

	return <>
		<div className='grid grid-cols-1 md:grid-cols-3 gap-2.5 md:mt-7'>
			{ filters.map(item => {
				return <Select
					key={ item.name }
					name={ item.name }
					label={ item.label }
					options={ item.options }
					onChange={ onChange }
					focusValue={ item.focusValue }
				/>
			}) }
		</div>
		<div className='flex flex-col-reverse md:flex-row items-start justify-between mt-7'>
			<div className='flex items-center mt-4 md:mt-0'>
				<h6 className='uppercase md:text-xl font-bold text-white'>Сезон</h6>
				<div className='flex ml-5 gap-x-2.5'>
					{ buttons.map(item => {
						const Icon = icons[item.icon];
						return (
							<Button key={ item.id } variant='bordered' radius='full' isIconOnly size='lg'
											onPress={ () => handleClick(item.id) }
											className={ twMerge('hover:border-white', season === item.id ? 'border-white' : 'border-[#296EA9] md:border-blue-400'
											) }>
								<Icon/>
							</Button>
						)
					}) }
				</div>
			</div>
			<button className='text-base md:text-sm font-bold text-white hover:text-blue-300 max-h-max'>
				+ { t('add all') }
			</button>
		</div>
		<div className='mt-4 md:mt-10'>
			<Button isLoading={ isLoading } onPress={ onClick } radius='full' size='lg' className='w-full md:w-72 uppercase font-bold bg-white text-black'>
				{ t('choose tires') }
			</Button>
		</div>
	</>
};

export default TiresFilter;
