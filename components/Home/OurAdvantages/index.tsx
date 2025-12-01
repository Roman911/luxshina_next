import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import Title from '../../UI/Title';

const items = [
	{
		title: 'in tire market with',
		subtitle: 'year',
	},
	{
		title: 'full',
		subtitle: 'maintenance cycle',
	},
	{
		title: 'registered trademark',
		subtitle: 'luxshina tm',
	},
	{
		title: 'fast delivery'
	}
];

interface OurAdvantagesProps {
	size?: 'small'
}

const OurAdvantages: FC<OurAdvantagesProps> = ({ size }) => {
	const t = useTranslations('OurAdvantages');

	const Item = ({ title, subtitle, index }: { title: string, subtitle?: string, index: number }) => {
		return (
			<div className='flex items-center'>
				<Image
					width={ size ? 40 : 100 }
					height={ size ? 40 : 100 }
					className={ twMerge(size ? 'mr-4' : 'md:w-auto mr-5 md:mr-6') }
					src={`/images/our_advantages/item-oa-${index+1}.svg`}
					alt=""
				/>
				{ index === 1 ? <h4><span className='font-bold'>{ t(title) } </span>{ subtitle && t(subtitle) }</h4> :
				<h4>{ t(title) } <span className='font-bold'>{ subtitle && t(subtitle) }</span></h4> }
			</div>
		)
	}

	return <div className={ twMerge('bg-white', size ? 'rounded-2xl mt-5 px-5 py-7' : 'mt-24 py-4 px-4 lg:py-24 lg:px-28') }>
		<Title title={ t('our advantages') } className={ size ? 'font-bold' : 'my-5 text-3xl md:text-4xl font-bold' } />
		<div className={ twMerge('grid', size ? 'mt-8 grid-cols-1 gap-y-5 text-sm leading-5' : 'mt:10 md:mt-14 grid-cols-1 lg:grid-cols-2 gap-y-7 md:gap-y-12 text-xl md:text-2xl leading-7 md:leading-9') }>
			{ items.map((item, index) => {
				return <Item key={ index } title={ item.title } subtitle={ item.subtitle } index={ index } />
			}) }
		</div>
	</div>
};

export default OurAdvantages;
