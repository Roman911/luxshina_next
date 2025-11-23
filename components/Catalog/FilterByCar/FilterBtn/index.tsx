import { FC } from 'react';
import * as Icons from '@/components/UI/Icons';

interface FilterBtnProps {
	openFilter: (isOpen: boolean) => void
	title: string
}

const FilterBtn: FC<FilterBtnProps> = ({ openFilter, title }) => {
	return <button
		onClick={() => openFilter(true)}
		className='lg:hidden flex items-center font-bold gap-x-2.5'
	>
		<Icons.FilterIcon />
		{ title }
	</button>
};

export default FilterBtn;
