'use client'
import { FC, useEffect, useState } from 'react';
import { ProductTiporazmerProps } from '@/models/featureParams';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/button';

interface PopularSizesProps {
	data: ProductTiporazmerProps[] | undefined
}

type SortedTires = {
	[key: number]: ProductTiporazmerProps[];
};

const PopularSizes: FC<PopularSizesProps> = ({ data }) => {
	const [ sortParams, setSortParams ] = useState({});

	useEffect(() => {
		const sort: SortedTires = { 12: [], 13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [] };

		data?.forEach(item => {
			const radiusNumber = Number(item.radius);

			if (radiusNumber in sort) {
				sort[radiusNumber].push(item);
			}
		});

		Object.keys(sort).forEach(key => {
			if (sort[Number(key)].length === 0) {
				delete sort[Number(key)];
			}
		});

		setSortParams(sort);
	}, [data]);

	return <>
		<div className='grid grid-cols-2 lg:grid-cols-9 mt-12 gap-x-5'>
			{Object.entries(sortParams as Record<string, ProductTiporazmerProps[]>).map(([key, value]) => {
				return (
					<div key={key} className='flex flex-col gap-4'>
						<div className='text-center text-lg font-bold'>R{key}</div>
						{value.map((item) => (
							<Link key={ item.tiporazmer_id } href={ `/catalog/tires/w-${item.width}/h-${item.height}/d-${item.radius}` } >
								<Button color='primary' radius='full' variant='bordered' size='lg' className='text-black font-semibold'>
									{`${item.width}/${item.height} R${key}`}
								</Button>
							</Link>
						))}
					</div>
				);
			})}
		</div>
	</>
};

export default PopularSizes;
