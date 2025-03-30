export const typeCatLinks = [
	{
		label: 'light',
		href: '/catalog/tires/vt-1', // 'vehicle_type=1,2
		icon: 'light',
		vehicleType: ['1'],
	},
	{
		label: 'suvs',
		href: '/catalog/tires/vt-2',
		icon: 'suv',
		iconStyles: 'stroke-gray-500 group-hover/item:stroke-primary',
		iconStylesActive: 'stroke-primary',
		vehicleType: ['2'],
	},
	{
		label: 'buses',
		href: '/catalog/tires/vt-8',
		icon: 'bus',
		vehicleType: ['8'],
	},
	{
		label: 'cargo',
		href: '/catalog/tires/vt-3', // vehicle_type=3,4,5,6
		icon: 'cargo',
		vehicleType: ['3','4','5','6'],
	},
	{
		label: 'special equipment',
		href: '/catalog/tires/vt-9', //vehicle_type=9,10,11
		icon: 'special',
		vehicleType: ['9','10','11'],
	},
	{
		label: 'motorcycles',
		href: '/catalog/tires/vt-7',
		icon: 'motorcycle',
		vehicleType: ['7'],
	},
];
