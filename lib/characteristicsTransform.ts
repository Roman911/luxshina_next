type VehicleType = {
	icon: 'light' | 'pozashlyahoviki' | 'cargo' | 'motorcycle' | 'busi' | 'special';
	name: string;
	to: string;
};

export const SeasonTransform = (season: string) => {
	const seasonMap: Record<string, { icon: string; name: string } | null> = {
		'1': { icon: '/icons/sun.svg', name: 'summer' },
		'2': { icon: '/icons/snow.svg', name: 'winter' },
		'3': { icon: '/icons/cloud.svg', name: 'all season' },
	};

	return seasonMap[season] || null;
};

export const VehicleTypeTransform = (type: string): VehicleType | undefined => {
	const vehicleTypeMap: { [key: string]: VehicleType } = {
		'1': { icon: 'light', name: 'light', to: '/katalog/avtoshini/vt-1' },
		'2': { icon: 'pozashlyahoviki', name: 'SUVs', to: '/katalog/avtoshini/vt-2' },
		'3': { icon: 'cargo', name: 'veducha', to: '/katalog/avtoshini/vt-3' },
		'4': { icon: 'cargo', name: 'rylevaya', to: '/katalog/avtoshini/vt-4' },
		'5': { icon: 'cargo', name: 'pricepnaya', to: '/katalog/avtoshini/vt-5' },
		'6': { icon: 'cargo', name: 'universalna', to: '/katalog/avtoshini/vt-6' },
		'7': { icon: 'motorcycle', name: 'motorcycles', to: '/katalog/avtoshini/vt-7' },
		'8': { icon: 'busi', name: 'buses', to: '/katalog/avtoshini/vt-8' },
		'9': { icon: 'special', name: 'sg', to: '/katalog/avtoshini/vt-9' },
		'10': { icon: 'special', name: 'kirerna', to: '/katalog/avtoshini/vt-10' },
		'11': { icon: 'special', name: 'industrial', to: '/katalog/avtoshini/vt-11' },
	};

	return vehicleTypeMap[type];
};
