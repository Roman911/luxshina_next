interface Descriptions {
	ua: {
		title: string
	}
	ru: {
		title: string
	}
}

interface Childs {
	seazon: {
		alias: string
		category_id: number
		descriptions: Descriptions
	}[]
	spec: {
		alias: string
		category_id: number
		descriptions: Descriptions
	}[]
	type: {
		alias: string
		category_id: number
		descriptions: Descriptions
	}[]
}

export interface IMenu {
	alias: string
	category_id: number
	childs: Childs
	descriptions: Descriptions
	manufs: {
		alias: string
		manufacturer_id: number
		name: string
	}[]
	radius: {
		alias: string
		name: string
		radius: string
	}[]
}