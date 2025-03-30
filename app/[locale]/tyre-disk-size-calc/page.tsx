'use client'
import { useEffect, useState } from 'react';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import TyreDiskSizeCalcComponent from '@/components/TyreDiskSizeCalc';
import NoResult from '@/components/UI/NoResult';

export default function TyreDiskSizeCalc() {
	const [ isStatic, setStatic ] = useState(true);

	useEffect(() => {
		setStatic(false);
	}, [])

	const path = [
		{
			title: 'tire calculator',
			translations: true,
			href: '/tyre-disk-size-calc'
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title='tire calculator' translations={ true } />
			{ isStatic ? <NoResult noResultText='page is unavailable' /> : <TyreDiskSizeCalcComponent /> }
		</LayoutWrapper>
	)
};
