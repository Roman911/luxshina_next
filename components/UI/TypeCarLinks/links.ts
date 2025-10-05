export const typeCatLinks = [
	{
		label: 'light',
		href: '/katalog/shyny/legkovi', // 'vehicle_type=1,2
		icon: 'light',
		vehicleType: ['1'],
	},
	{
		label: 'suvs',
		href: '/katalog/shyny/suv',
		icon: 'suv',
		iconStyles: 'stroke-gray-500 group-hover/item:stroke-primary',
		iconStylesActive: 'stroke-primary',
		vehicleType: ['2'],
	},
	{
		label: 'buses',
		href: '/katalog/shyny/bus',
		icon: 'bus',
		vehicleType: ['8'],
	},
	{
		label: 'cargo',
		href: '/katalog/shyny/gruzovie', // vehicle_type=3,4,5,6
		icon: 'cargo',
		vehicleType: ['3','4','5','6'],
	},
	{
		label: 'special equipment',
		href: '/katalog/shyny/spectehnika', //vehicle_type=9,10,11
		icon: 'special',
		vehicleType: ['9','10','11'],
	},
	{
		label: 'motorcycles',
		href: '/katalog/shyny/moto',
		icon: 'motorcycle',
		vehicleType: ['7'],
	},
];
