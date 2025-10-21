'use client'
import { useEffect, useState } from 'react';
import TyreDiskSizeCalcComponent from '@/components/TyreDiskSizeCalc';
import NoResult from '@/components/UI/NoResult';

export default function CalcWrapper() {
	const [ isStatic, setStatic ] = useState(true);

	useEffect(() => {
		setStatic(false);
	}, []);

	if(isStatic) return <NoResult noResultText='page is unavailable' />;

	return <TyreDiskSizeCalcComponent />
};
