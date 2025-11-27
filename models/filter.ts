export enum Section {
	Battery = 'akumulyatori',
	Tires = 'avtoshini',
	Disks = 'diski',
	Car = 'car',
	Cargo = 'vantazhni',
	Moto = 'motoshini',
	Spectehnika = 'spectehnika',
}

export enum Subsection {
	ByParams = 'byParams',
	ByCars = 'byCars',
}

export interface IFilter {
	width?: null | string
	height?: null | string
	radius?: null | string
	sezon?: null | string
	brand?: null | string
	model_id?: null | string
	country?: null | string
	year?: null | string
	omolog?: null | string
	krepeg?: null | string
	typedisk?: null | string
	colir?: null | string
	jemnist?: null | string
	puskovii_strum?: null | string
	tip_elektrolitu?: null | string
	tip_korpusu?: null | string
	napruga?: null | string
	poliarnist?: null | string
	vehicle_type?: null | string
	li?: null | string
	si?: null | string
	only_studded?: null | string
	only_c?: null | string
	only_xl?: null | string
	only_owl?: null | string
	only_run_flat?: null | string
	only_off_road?: null | string
	minPrice?: null | string
	maxPrice?: null | string
	et?: null | string
	etMin?: null | string
	etMax?: null | string
	dia?: null | string
	diaMin?: null | string
	diaMax?: null | string
	minShirina?: null | string
	maxShirina?: null | string
	minVisota?: null | string
	maxVisota?: null | string
	minDovzina?: null | string
	maxDovzina?: null | string
}

export interface IOpenFilter {
	width: {
		open: boolean,
		scrollValue: number | null
	}
	height: {
		open: boolean,
		scrollValue: number | null
	}
	radius: {
		open: boolean,
		scrollValue: number | null
	}
	sezon: {
		open: boolean,
		scrollValue: number | null
	}
	brand: {
		open: boolean,
		scrollValue: number | null
	}
	model_id: {
		open: boolean,
		scrollValue: number | null
	}
	citys: {
		open: boolean,
		scrollValue: number | null
	}
	country: {
		open: boolean,
		scrollValue: number | null
	}
	year: {
		open: boolean,
		scrollValue: number | null
	}
	omolog: {
		open: boolean,
		scrollValue: number | null
	}
	krepeg: {
		open: boolean,
		scrollValue: number | null
	}
	typedisk: {
		open: boolean,
		scrollValue: number | null
	}
	colir: {
		open: boolean,
		scrollValue: number | null
	}
	jemnist: {
		open: boolean,
		scrollValue: number | null
	}
	puskovii_strum: {
		open: boolean,
		scrollValue: number | null
	}
	tip_elektrolitu: {
		open: boolean,
		scrollValue: number | null
	}
	tip_korpusu: {
		open: boolean,
		scrollValue: number | null
	}
	napruga: {
		open: boolean,
		scrollValue: number | null
	}
	poliarnist: {
		open: boolean,
		scrollValue: number | null
	}
	vehicle_type: {
		open: boolean,
		scrollValue: number | null
	}
	li: {
		open: boolean,
		scrollValue: number | null
	}
	si: {
		open: boolean,
		scrollValue: number | null
	}
	other: {
		open: boolean,
		scrollValue: number | null
	}
}
