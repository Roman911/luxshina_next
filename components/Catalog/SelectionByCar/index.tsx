'use client';
import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { changeSubsection } from '@/store/slices/filterSlice';
import { Section, Subsection } from '@/models/filter';
import Tires from '@/components/Catalog/SelectionByCar/Tires';
import Disks from '@/components/Catalog/SelectionByCar/Disks';

const SelectionByCar = ({ car, section }: { car: string | null; section: Section }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const { subsection } = useAppSelector(state => state.filterReducer);
	const result = car && car.split('-').filter(part => /^\d+$/.test(part));

	useEffect(() => {
		if(car) {
			dispatch(changeSubsection(Subsection.ByCars));
		}
	}, [ car, dispatch ]);

	if(!car || (result && result.length < 3) || subsection === Subsection.ByParams) return null;

	const numbers = car.split('-').filter(part => /^\d+$/.test(part)).map(Number);
	const modification = numbers[3] || 0;
	const cleaned = pathname.replace(/^.*?\/car[^\/]*/, '');
	const handleClick = () => dispatch(setProgress(true));

	const commonProps = { modification, car, handleClick, cleaned };

	return (
		<div className='mb-5 border-y py-4 border-gray-300'>
			{ section !== Section.Disks ? <Tires { ...commonProps } /> : <Disks { ...commonProps } /> }
		</div>
	);
};

export default SelectionByCar;