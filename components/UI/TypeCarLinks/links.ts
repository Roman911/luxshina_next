export const typeCatLinks = [
	{
		label: 'light',
		href: '/katalog/avtoshini/legkovi', // 'vehicle_type=1,2
		icon: 'light',
		vehicleType: ['1'],
	},
	{
		label: 'pozashlyahoviki',
		href: '/katalog/avtoshini/pozashlyahoviki',
		icon: 'suv',
		iconStyles: 'stroke-gray-500 group-hover/item:stroke-primary',
		iconStylesActive: 'stroke-primary',
		vehicleType: ['2'],
	},
	{
		label: 'buses',
		href: '/katalog/avtoshini/busi',
		icon: 'bus',
		vehicleType: ['8'],
	},
	{
		label: 'vantazhni',
		href: '/katalog/vantazhni', // vehicle_type=3,4,5,6
		icon: 'cargo',
		vehicleType: ['3','4','5','6'],
	},
	{
		label: 'special equipment',
		href: '/katalog/spectehnika', //vehicle_type=9,10,11
		icon: 'special',
		vehicleType: ['9','10','11'],
	},
	{
		label: 'motorcycles',
		href: '/katalog/motoshini',
		icon: 'motorcycle',
		vehicleType: ['7'],
	},
];
