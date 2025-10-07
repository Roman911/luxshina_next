import { Section } from '@/models/filter';

export const TypeTires = (section: Section, slug: string[]) => {
	if (section === Section.Tires) {
		if (slug?.includes('pozashlyahoviki')) {
			return '&vehicle_type=2';
		} else if (slug?.includes('busi')) {
			return '&vehicle_type=8';
		} else if (slug?.includes('off-road-4x4')) {
			return '&vehicle_type=2&only_off_road=1';
		} else {
			return '&vehicle_type=1';
		}
	} else if(section === Section.Cargo) {
		return '&vehicle_type=3';
	} else if(section === Section.Spectehnika) {
		return '&vehicle_type=9';
	} else if(section === Section.Moto) {
		return '&vehicle_type=7';
	} else {
		return null;
	}
};
