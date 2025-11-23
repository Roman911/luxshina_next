import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useTranslations } from 'next-intl';
import type { Options } from '@/models/baseData';

interface SelectProps {
	name: string;
	label: string;
	isDisabled?: boolean;
	setState?: Dispatch<SetStateAction<string | undefined>>;
	options: Options[] | undefined;
	onChange: (name: string, value: number | string | null, label?: number | string | null) => void;
	defaultValue?: string;
}

const MySelect: FC<SelectProps> = (
	{
		name,
		label,
		options = [],
		isDisabled = false,
		onChange,
		setState,
		defaultValue,
	}
) => {
	const t = useTranslations('Select');
	const [ selectedKey, setSelectedKey ] = useState<string | number | null>(defaultValue ?? null);

	useEffect(() => {
		setSelectedKey(defaultValue ?? null);
	}, [ defaultValue ]);

	const handleChange = (key: number | string | null) => {
		const label = key ? options.find(i => i.value === key) : { label: '' };
		setSelectedKey(key);
		onChange(name, key, label?.label);
	};

	const handleInputChange = (value: string) => {
		const cleanedText = value.replace(/[^а-яА-ЯіїєґІЇЄҐ' ]/g, '');
		if(setState) setState(cleanedText?.toString());
	};

	return (
		<Autocomplete
			selectedKey={ selectedKey }
			onInputChange={ handleInputChange }
			className="max-w-full md:max-w-full"
			classNames={ { listboxWrapper: 'rounded-xs' } }
			label={ label }
			isDisabled={ isDisabled }
			defaultItems={ options }
			onSelectionChange={ handleChange }
			listboxProps={ {
				emptyContent: t('no options message'),
			} }
		>
			{ (item) => <AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem> }
		</Autocomplete>
	);
};

export default MySelect;
