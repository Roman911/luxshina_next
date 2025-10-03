import { type Offers, Product } from '@/models/product';
import { Product as Products, ProductsProps } from '@/models/products';
import { Section } from '@/models/filter';

export const onItemView = (data: Product | undefined, section: string) => {
	if(!data) return;

	const items = [{
		item_name: data.full_name,
		item_id: data.id,
		price: data.min_price,
		item_brand: data.brand.name,
		item_category: section,
		item_category2: data.model.name,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "view_item",
		ecommerce: {
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onAddToCart = (data: Product | Products | undefined, section: string, quantity: number) => {
	if (!data) return;

	let id;
	let brand;

	if ("id" in data) {
		id = data.id;
		brand = data.brand.name;
	} else {
		id = data.group;
		brand = data.brand_name;
	}

	const items = [{
		item_name: data.full_name,
		item_id: id,
		price: data.min_price,
		item_brand: brand,
		item_category: section,
		item_category2: data.model.name,
		quantity,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "add_to_cart",
		ecommerce: {
			items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onOrderMakeStart = (data: ProductsProps | undefined, cartItem: {id: number, quantity: number, section: string}[]) => {
	if(!data) return;

	const items = data?.data.products.map((item) => {
		const cart = cartItem.find((product) => product.id === item.best_offer.id);

		return {
			item_name: item.full_name,
			item_id: item.group,
			price: item.min_price,
			item_brand: item.brand_name,
			item_category: cart?.section === 'shyny' ? 'Автошини' : cart?.section === 'disks' ? 'Автодиски' : cart?.section === 'battery' ? 'Акумулятори' : '',
			item_variant: item.model.name,
			quantity: cart?.quantity,
		}
	});

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "begin_checkout",
		ecommerce: {
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onOrderMakeEnd = (data: ProductsProps | undefined, cartItem: {id: number, quantity: number, section: string}[], orderId: number) => {
	if(!data) return;

	const items = data?.data.products.map((item) => {
		const cart = cartItem.find((product) => product.id === item.best_offer.id);

		return {
			item_name: item.full_name,
			item_id: item.group,
			price: item.min_price,
			item_brand: item.brand_name,
			item_category: cart?.section === 'shyny' ? 'Автошини' : cart?.section === 'disks' ? 'Автодиски' : cart?.section === 'battery' ? 'Акумулятори' : '',
			item_variant: item.model.name,
			quantity: cart?.quantity || 0,
		}
	});

	const totalSum = items.reduce((sum, item) => {
		return sum + (item.price * item.quantity);
	}, 0);

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "purchase",
		ecommerce: {
			transaction_id: orderId,
			affiliation: 'main',
			value: totalSum,
			currency: 'UAN',
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onOrderBuy1click = (
	offerItem: Offers | undefined,
	fullName: string | undefined,
	brand: string | undefined,
	section: Section,
	model: string | undefined,
	quantity: number,
	orderId: number
) => {
	if(!offerItem) return;

	const items = [{
		item_name: fullName,
		item_id: offerItem.product_id,
		price: offerItem.price,
		item_brand: brand,
		item_category: section === 'shyny' ? 'Автошини' : section === 'disks' ? 'Автодиски' : section === 'battery' ? 'Акумулятори' : '',
		item_variant: model,
		quantity: quantity,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "purchase",
		ecommerce: {
			transaction_id: orderId,
			affiliation: 'buy1click',
			value: +offerItem.price * quantity,
			currency: 'UAN',
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};
