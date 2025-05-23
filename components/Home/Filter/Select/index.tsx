'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Autocomplete, AutocompleteItem, AutocompleteSection } from '@heroui/autocomplete';
import { useAppSelector } from '@/hooks/redux';
import { Section } from '@/models/filter';
import type { Options } from '@/models/baseData';
import { POPULAR_SIZE } from '@/etc/const';

const popularSize = ['width', 'height', 'radius'];

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
	const { section } = useAppSelector(state => state.filterReducer);
	const popularSizeOptions =
		section === Section.Tires ? popularSize.includes(name) && POPULAR_SIZE[name]
			: section === Section.Battery && name === 'jemnist' && POPULAR_SIZE[name];

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
		{ popularSizeOptions ? <>
			<AutocompleteSection classNames={{ heading: 'text-medium font-bold text-black' }} title={ t('popular') }>
				{ popularSizeOptions.map((item) => (
					<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
				)) }
			</AutocompleteSection>
			<AutocompleteSection classNames={{ heading: 'text-medium font-bold text-black' }} title={ t('all') }>
				{ options.map((item) => (
					<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
				)) }
			</AutocompleteSection>
		</> : options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
