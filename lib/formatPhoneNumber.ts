export const formatPhoneNumber = (phone: string) => {
	return phone.replace(/[\s()_-]/g, '');
};
