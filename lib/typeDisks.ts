export const TypeDisks = (slug: string[]) => {
	if (slug?.includes('liti')) {
		return '&typedisk=3';
	} else if (slug?.includes('stalni')) {
		return '&typedisk=1';
	} else if (slug?.includes('kovani')) {
		return '&typedisk=2';
	} else {
		return null;
	}
};
