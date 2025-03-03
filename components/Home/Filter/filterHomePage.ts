import type { Options } from '@/models/baseData';

interface Filters {
	focusValue?: string
	label: string
	name: string
	options: Options[] | undefined
}

export interface OnChange {
	(name: string, value: number | string | null): void
}

export interface FilterProps {
	filters: Filters[]
	onChange: OnChange
}
