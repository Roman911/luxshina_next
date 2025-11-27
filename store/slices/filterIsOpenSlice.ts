import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IOpenFilter } from '@/models/filter';

export interface FilterState {
	filterIsOpen: IOpenFilter
	menuIsOpen: boolean
}

const initialMenuState: boolean = false;

const initialFilterState: IOpenFilter = {
	width: {
		open: false,
		scrollValue: null
	},
	height: {
		open: false,
		scrollValue: null
	},
	radius: {
		open: false,
		scrollValue: null
	},
	sezon: {
		open: false,
		scrollValue: null
	},
	brand: {
		open: false,
		scrollValue: null
	},
	model_id: {
		open: false,
		scrollValue: null
	},
	citys: {
		open: false,
		scrollValue: null
	},
	country: {
		open: false,
		scrollValue: null
	},
	year: {
		open: false,
		scrollValue: null
	},
	omolog: {
		open: false,
		scrollValue: null
	},
	krepeg: {
		open: false,
		scrollValue: null
	},
	typedisk: {
		open: false,
		scrollValue: null
	},
	colir: {
		open: false,
		scrollValue: null
	},
	jemnist: {
		open: false,
		scrollValue: null
	},
	puskovii_strum: {
		open: false,
		scrollValue: null
	},
	tip_elektrolitu: {
		open: false,
		scrollValue: null
	},
	tip_korpusu: {
		open: false,
		scrollValue: null
	},
	napruga: {
		open: false,
		scrollValue: null
	},
	poliarnist: {
		open: false,
		scrollValue: null
	},
	vehicle_type: {
		open: false,
		scrollValue: null
	},
	li: {
		open: false,
		scrollValue: null
	},
	si: {
		open: false,
		scrollValue: null
	},
	other: {
		open: false,
		scrollValue: null
	}
}

const initialState: FilterState = {
	filterIsOpen: initialFilterState,
	menuIsOpen: initialMenuState,
}

export const filterIsOpenSlice = createSlice({
	name: 'filterIsOpen',
	initialState,
	reducers: {
		open: (state, actions: PayloadAction<{ key: keyof IOpenFilter, value: boolean }>) => {
			state.filterIsOpen[actions.payload.key] = { open: actions.payload.value, scrollValue: null };
		},
		close: (state, actions: PayloadAction<keyof IOpenFilter>) => {
			state.filterIsOpen[actions.payload] = { open: false, scrollValue: null };
		},
		setScrollValue: (state, actions: PayloadAction<{ key: keyof IOpenFilter, value: number | null }>) => {
			state.filterIsOpen[actions.payload.key] = { open: true, scrollValue: actions.payload.value };
		},
		setMenuIsOpen: (state, actions: PayloadAction<boolean>) => {
			state.menuIsOpen = actions.payload;
		},
		reset: () => initialState,
	},
});

export const { close, open, setScrollValue, setMenuIsOpen, reset } = filterIsOpenSlice.actions;

export default filterIsOpenSlice.reducer;
