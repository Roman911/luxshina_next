import { redirect } from 'next/navigation';
import {
	API_CONSTANTS,
	DEFAULT_HEADERS,
	baseEndpoints,
	productEndpoints
} from '@/config/api';
import { ProductProps } from '@/models/product';
import { BaseDataProps } from '@/models/baseData';
import { BrandsObject, BrandsObjectItems } from '@/models/brends';
import { AliasAll, Pages } from '@/models/alias';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFilters() {
	const res = await fetch(`${ API_URL }${ baseEndpoints.baseData }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});
	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getSettings() {
	const res = await fetch(`${ API_URL }${ baseEndpoints.settings }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getProducts(id: string, start: number, length: number) {
	const res = await fetch(`${ API_URL }${ productEndpoints.products(id) }`, {
		method: API_CONSTANTS.METHODS.POST,
		headers: DEFAULT_HEADERS,
		body: JSON.stringify({ start, length }),
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getProduct(id: string): Promise<ProductProps> {
	const res = await fetch( `${ API_URL }${ productEndpoints.product(id) }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if(!res.ok) {
		redirect('/404');
	} else {
		return await res.json();
	}
}

export async function getFeatureParams() {
	const res = await fetch(`${ API_URL }${ baseEndpoints.featureParams }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getReviews() {
	const res = await fetch(`${ API_URL }${ baseEndpoints.reviews }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getFilterData(id: string): Promise<BaseDataProps> {
	const res = await fetch( `${ API_URL }${ baseEndpoints.filterData(id) }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getBrands(id: string): Promise<BrandsObject | BrandsObjectItems> {
	const res = await fetch(`${ API_URL }${ baseEndpoints.brands(id) }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getFiltersAkum() {
	const res = await fetch(`${process.env.SERVER_URL}${ baseEndpoints.dataAkum }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getAliasAll(): Promise<AliasAll> {
	const res = await fetch(`${ API_URL }${ baseEndpoints.statiAlias.all }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getAlias(id: string): Promise<Pages> {
	const res = await fetch(`${ API_URL }${ baseEndpoints.statiAlias.byId(id) }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getMenu() {
	const res = await fetch(`${ API_URL }${ baseEndpoints.menu }`, {
		method: API_CONSTANTS.METHODS.GET,
		headers: DEFAULT_HEADERS
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}

export async function getSeo(url: string | false, brand_id: string | false, model_id: string | false, category_id: string | false, product_id: string | false) {
	const res = await fetch(`${ API_URL }${ baseEndpoints.seo }`, {
		method: API_CONSTANTS.METHODS.POST,
		headers: DEFAULT_HEADERS,
		body: JSON.stringify({ url, brand_id, model_id, category_id, product_id }),
	});

	if (!res.ok) throw new Error('Failed to fetch products');

	return await res.json();
}
