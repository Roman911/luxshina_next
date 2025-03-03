'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import type { Options } from '@/models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | null) => void
}

const MySelect: FC<SelectProps> = ({ name, label, options = [], isDisabled = false, onChange }) => {
	const t = useTranslations('Filters');

	const onSelectionChange = (key: number | string | null) => {
		onChange(name, key);
	};

	return <Autocomplete
		className='max-w-full text-white'
		classNames={{
			listboxWrapper: 'rounded-xs',
		}}
		label={ t(label) }
		isDisabled={ isDisabled }
		onSelectionChange={onSelectionChange}
		radius='none'
		size='lg'
		color='primary'
		listboxProps={{
			emptyContent: t('no options message'),
		}}
	>
		{ options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
