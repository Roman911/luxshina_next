import { Section } from '@/models/filter';
import type { BaseDataProps } from '@/models/baseData';
import type { AkumProps } from '@/models/akumData';

const allowed = [ 'w', 'h', 'd', 'b', 's', 'stud', 'm', 'ctr', 'y', 'hm', 'kr', 'td', 'clr', 'ct', 'sk', 'elt',
	'tk', 'am', 'pl', 'vt', 'li', 'si', 'oc', 'xl', 'owl', 'rf', 'ofr', 'pfrom', 'pto', 'etfrom', 'etto', 'diafrom',
	'diato', 'wfrom', 'wto', 'hfrom', 'hto', 'lngfrom', 'lngto', 'litni', 'zimovi', 'vsesezonnye', 'shipovani', 'legkovi',
	'pozashlyahoviki', 'busi', 'spectehnika', 'vantazhni', 'motoshini', 'p', 'brand', 'shipovani', 'off-road-4x4', 'liti',
	'stalni', 'kovani'
];

export const Brand = (section: Section, slug: string[], filters: BaseDataProps | undefined, filtersAkum: AkumProps | undefined) => {
	const result = slug?.filter(item => {
		const [prefix] = item.split('-');
		return !allowed.includes(prefix);
	});
	const brands = section === Section.Disks ? filters?.brand_disc : section === Section.Battery ? filtersAkum?.brand_akum : filters?.brand;

	return result?.length ? brands?.find((item: { alias: string; }) => item.alias === result[0]) : null;
};
