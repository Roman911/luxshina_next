import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import Select from '../Select';
import type { FilterProps } from '@/models/filterHomePage';
import { Button } from '@heroui/react';

const DisksFilter: FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const t = useTranslations('HeaderFilter');

	const onClick = () => {
		setIsLoading(true);
		onSubmit();
	}

	return <>
		<div className='grid grid-cols-1 md:grid-cols-3 gap-2.5 md:mt-7'>
			{filters.map(item => {
				return <Select
					key={ item.name }
					name={ item.name }
					label={ item.label }
					options={ item.options }
					onChange={ onChange }
					focusValue={item.focusValue}
				/>
			})}
		</div>
		<div className='mt-4 md:mt-10'>
			<Button isLoading={ isLoading } onPress={ onClick } radius='full' size='lg' className='w-full md:w-72 uppercase font-bold bg-white text-black'>
				{t('choose disks')}
			</Button>
		</div>
	</>
};

export default DisksFilter;
