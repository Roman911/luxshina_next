import { Section } from '@/models/filter';
import type { BaseDataProps, ManufModels } from '@/models/baseData';
import type { AkumProps } from '@/models/akumData';

export const Brand = (section: Section, slug: string[], filters: BaseDataProps | undefined, filtersAkum: AkumProps | undefined) => {
	const index = slug?.indexOf('brand');
	const result = (slug && index !== -1) ? slug[index + 1] : null;
	const brands = section === Section.Disks ? filters?.brand_disc : section === Section.Battery ? filtersAkum?.brand_akum : filters?.brand;

	return result?.length ? brands?.find((item: { alias: string; }) => item.alias === result) : null;
};

export const getModel = (slug: string[], models: ManufModels[] | undefined) => {
	const index = slug?.indexOf('model');
	const result = (slug && index !== -1) ? slug[index + 1] : null;

	return result?.length ? models?.find((item: { alias: string; }) => item.alias === result) : null;
}
