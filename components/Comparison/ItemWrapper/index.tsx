'use client'
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { FC, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { Product } from '@/models/products';
import CloseButton from '@/components/UI/CloseButton';
import { Characteristics } from '../Characteristics';
import * as Icons from '../../UI/Icons';
import { Button } from '@heroui/react';

interface ItemWrapperProps {
	characteristics: Product[]
	tab: string
	name: 'tires' | 'cargo' | 'disks' | 'akumulyatori'
	handleClickAction: (id: number) => void
	onClickAction: (offerId: number, section: string) => void
}

export const ItemWrapper: FC<ItemWrapperProps> = (
	{
		characteristics,
		name,
		tab,
		handleClickAction,
		onClickAction,
	}) => {
	const t = useTranslations('Filters');

	const removeClick = (event: MouseEvent<HTMLDivElement | HTMLButtonElement>, id: number) => {
		event.preventDefault();
		handleClickAction(id);
	}

	return characteristics.map(item => {
		return <div key={ item.group }>
			<div className='w-60 relative m-1 min-h-60 bg-white'>
				<Link href={ `/${ item.page_url }` }>
					<CloseButton handleClick={ (event) => removeClick(event, item.product_id) }/>
					<Image height={ 240 } width={ 240 } src={ item.default_photo } alt=""/>
					<div
						className='absolute bottom-0 px-2 text-center bg-gray-500 rounded-sm h-20 flex items-center justify-center w-full whitespace-normal'>
						<p className='text-white text-center font-bold'>
							{ item.full_name }
						</p>
					</div>
				</Link>
			</div>
			<div className='divide-y divide-[#D0D4D9] text-center'>
				<Characteristics name={ name } item={ item } />
				<div className='pt-8 pb-14'>
					<Link href='/cart'>
						<Button
							onPress={() => onClickAction(item.best_offer.id, tab)}
							radius='full'
							color='primary'
							size='lg'
							className='uppercase font-bold w-full md:w-52 mx-auto'
							startContent={<Icons.CartIcon className='stroke-white'/>}
						>
							{ t('buy') }
						</Button>
					</Link>
				</div>
			</div>
		</div>
	})
};
