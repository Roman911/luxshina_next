export const Season = (slug: string[]) => {
	if (slug?.includes('litni')) {
		return '&sezon=1';
	} else if (slug?.includes('zimovi')) {
		return '&sezon=2';
	} else if (slug?.includes('vsesezonnye')) {
		return '&sezon=3';
	} else if (slug?.includes('shipovani')) {
		return '&sezon=2&only_studded=1';
	} else {
		return null;
	}
};