import { FC } from 'react';
import { baseDataAPI } from '@/services/baseDataService';
import { useTranslations } from 'next-intl';
import CarBrand from './CarBrand';
import Button from './Button';

interface Props {
	modification: number;
	car: string | null;
	cleaned: string;
	handleClick: () => void;
}

const Disks: FC<Props> = ({ modification, car, handleClick, cleaned }) => {
	const t = useTranslations('Main');
	const { data } = baseDataAPI.useFetchKitDiskSizeQuery(`${ modification }`);

	const renderButtons = (type: number) =>
		data
			?.filter(i => i.type === type)
			.map(item => {
				const { bolt_count, pcd, dia } = item.kits;
				const params = `/w-${ item.width }/d-${ item.diameter }/kr-${ bolt_count }x${ pcd }/et-${ item.et }/dia-${ dia }`;
				return (
					<Button
						key={ item.value }
						handleClick={ handleClick }
						cleaned={ cleaned }
						params={ params }
						href={ `/katalog/diski/${ car }${ params }` }
					>
						{ `${ item.width }x${ item.diameter } ${ bolt_count }x${ pcd } ET${ item.et } DIA${ dia }` }
					</Button>
				);
			});

	return (
		<>
			{ data && <CarBrand data={ data[0] }/> }
			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>{ t('factory') }</h6>
			<div className='flex gap-2 text-sm font-bold mt-2'>{ renderButtons(1) }</div>

			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>Альтернатива</h6>
			<div className='flex flex-wrap gap-2 text-sm font-bold mt-2'>{ renderButtons(2) }</div>
		</>
	);
};

export default Disks;
