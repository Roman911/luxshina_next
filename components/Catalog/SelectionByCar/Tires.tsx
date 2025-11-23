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

const Tires: FC<Props> = ({ modification, car, handleClick, cleaned }) => {
	const t = useTranslations('Main');
	const { data } = baseDataAPI.useFetchKitTyreSizeQuery(`${modification}`);

	const renderButtons = (type: number) =>
		data
			?.filter(i => i.type === type)
			.map(item => {
				const params = `/w-${item.width}/h-${item.height}/d-${item.diameter}`;
				return (
					<Button
						key={item.value}
						handleClick={handleClick}
						cleaned={cleaned}
						params={params}
						href={`/katalog/avtoshini/${car}${params}`}
					>
						{`${item.width}/${item.height} R${item.diameter}`}
					</Button>
				);
			});

	return (
		<>
			{data && <CarBrand data={data[0]} />}
			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>{t('factory')}</h6>
			<div className='flex gap-1 text-sm font-bold mt-2'>{renderButtons(1)}</div>

			<h6 className='text-gray-500 mt-4 dark:text-[#949699]'>Альтернатива</h6>
			<div className='flex flex-wrap gap-1 text-sm font-bold mt-2'>{renderButtons(2)}</div>
		</>
	);
};

export default Tires;
