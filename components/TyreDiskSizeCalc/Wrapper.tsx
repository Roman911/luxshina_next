'use client'
import { useEffect, useState } from 'react';
import NoResult from '@/components/UI/NoResult';
import dynamic from 'next/dynamic';
import { Spinner } from '@heroui/react';

const DynamicCalc = dynamic(() => import('@/components/TyreDiskSizeCalc'), {
	loading: () => <Spinner />,
})

export default function CalcWrapper() {
	const [ isStatic, setStatic ] = useState(true);

	useEffect(() => {
		setStatic(false);
	}, []);

	if(isStatic) return <NoResult noResultText='page is unavailable' />;

	return <DynamicCalc />
};
