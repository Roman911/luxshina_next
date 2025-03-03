interface DescriptionsLang {
	name: string
	button_link: string
	button_title: string
	image: string
}

interface Descriptions {
	ua:DescriptionsLang
	ru:DescriptionsLang
}

export interface Banner {
	banner_id: number
	name: string
	created_at: string
	updated_at: string
	status: number
	sorts: number
	image: string
	descriptions: Descriptions
}

export interface Banners {
	data: Banner[]
}
