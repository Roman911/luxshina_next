import { Section } from '@/models/section';
import { BaseDataProps, Options } from '@/models/baseData';
import { Language } from '@/models/language';

interface Props {
	locale: string
	section: Section
	data: BaseDataProps | undefined
}

interface FilterConfigs {
	label: string
	name: string
	focusValue: string
	options: Options[] | undefined
}

export const getFilters = ({ locale, section, data }: Props) => {
	const filterConfigs: FilterConfigs[] = [];

	if(section === Section.Tires) {
		filterConfigs.push({
			label: 'width',
			name: 'width',
			focusValue: '175',
			options: data?.tyre_width?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});
		filterConfigs.push({
			label: 'height',
			name: 'height',
			focusValue: '45',
			options: data?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});

		filterConfigs.push({
			label: 'diameter',
			name: 'radius',
			focusValue: `R${14}`,
			options: data?.tyre_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
		});

		filterConfigs.push({
			label: 'brand',
			name: 'brand',
			focusValue: '',
			options: data?.brand?.map(item => ({ value: item.value, label: item.label }))
		});

		filterConfigs.push({
			label: 'country',
			name: 'country',
			focusValue: '',
			options: data?.[locale === Language.UK ? 'country' : 'country_ru']?.map(item => ({ value: item.value, label: item.label }))
		});

		filterConfigs.push({
			label: 'year',
			name: 'year',
			focusValue: '',
			options: data?.tyre_year?.map(item => ({ value: item.value, label: `${item.label}` }))
		});
	} else if(section === Section.Disks) {
		filterConfigs.push({
			label: 'brand',
			name: 'brand',
			focusValue: '',
			options: data?.brand_disc?.map(item => ({ value: item.value, label: item.label }))
		});

		filterConfigs.push({
			label: 'diameter',
			name: 'radius',
			focusValue: `R${14}`,
			options: data?.disc_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
		});

		filterConfigs.push({
			label: 'fasteners',
			name: 'krepeg',
			focusValue: '',
			options: data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});

		filterConfigs.push({
			label: 'et from',
			name: 'etMin',
			focusValue: '',
			options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});

		filterConfigs.push({
			label: 'et to',
			name: 'etMax',
			focusValue: '',
			options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
		});
	}

	return filterConfigs;
};
