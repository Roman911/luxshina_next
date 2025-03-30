'use client'
import { FC } from 'react';
import { ProductTiporazmerProps } from '@/models/featureParams';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

const popularDiameter = ['12','13','14','15','16','17','18','19','20','21'];

interface PopularSizesProps {
	data: ProductTiporazmerProps[] | undefined
}

const PopularSizes: FC<PopularSizesProps> = ({ data }) => {
	const dispatch = useAppDispatch();

	return <>
		<div className='grid grid-cols-2 lg:grid-cols-9 mt-12 gap-x-5'>
			{ data && popularDiameter.map(i => {
				const diameters = data.filter(item => item.radius === i);
				if(diameters.length === 0) return;
				return <div key={i} className='flex flex-col gap-4'>
					<div className='text-center text-lg font-bold'>R{i}</div>
					{diameters.map((item) => (
						<Link key={ item.tiporazmer_id } href={ `/catalog/tires/w-${item.width}/h-${item.height}/d-${item.radius}` } >
							<Button onPress={() => dispatch(setProgress(true))} color='primary' radius='full' variant='bordered' size='lg' className='text-black font-semibold'>
								{`${item.width}/${item.height} R${i}`}
							</Button>
						</Link>
					))}
				</div>
			}) }
		</div>
	</>
};

export default PopularSizes;
