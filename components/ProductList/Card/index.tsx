'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useMemo } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Card, CardBody, CardFooter } from '@heroui/react';
import { Link } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import Rating from '@/components/UI/Rating';
import IconsBlock from '@/components/ProductList/Card/IconsBlock';
import ActionsBlock from '@/components/ProductList/Card/ActionsBlock';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import CountryInfo from '@/components/UI/CountryInfo';
import * as Icons from '@/components/UI/Icons';
import { onAddToCart } from '@/event';
import { twMerge } from 'tailwind-merge';

const regex = /\/(avtotovari|poslugi)/;
const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];

interface Props {
	item: Product
}

const ProductCard: FC<Props> = ({ item }) => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { default_photo, full_name, sku, min_price, season, vehicle_type, page_url, best_offer, group } = item;
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : item.diameter ? Section.Disks : Section.Battery;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? Section.Cargo : Section.Tires : section;
	const countryCode = countryCodeTransform(best_offer.country);
	const hasMatch = regex.test(pathname);
	const url = hasMatch ? `#` : `/${page_url}`;

	const handleClick = () => {
		onAddToCart(item, t(section), 1);
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section }));
			addToStorage('reducerCart', cart);
		}
		router.push(`/${ locale }/cart`)
	};

	return (
		<Card radius='none' className='relative group'>
			<CardBody>
				<div className='relative min-h-72 sm:min-h-52 text-center'>
					<IconsBlock season={ season } vehicle_type={ vehicle_type }/>
					{ !hasMatch && <ActionsBlock sectionNew={ sectionNew } group={ group } className='hidden group-hover:flex'/> }
					<Image
						className='mx-auto'
						src={ default_photo || '/images/no-photo.jpg' }
						alt={ full_name }
						width={ 220 }
						height={ 220 }
					/>
				</div>
				<Link href={ url }
							className={twMerge('font-bold my-2.5 min-h-12 after:absolute after:inset-0', hasMatch && 'pointer-events-none')}>{ full_name }</Link>
				<div className='text-sm text-gray-500 my-2.5'>
					<span>Артикул: </span><span>{ sku }</span>
				</div>
				{ section !== Section.Battery && <div className='my-3.5'>
					<CountryInfo
						country={ locale === Language.UK ? best_offer.country : best_offer.country_ru }
						countryCode={ countryCode }
						year={ best_offer.year }
					/>
				</div> }
				<Rating commentsCount={ undefined } commentsAvgRate={ 0 }/>
			</CardBody>
			<CardFooter>
				<div className='w-full flex justify-between'>
					<div>
						<div className='flex items-end mb-0.5'>
							<div className='text-sm font-medium mb-0.5 mr-1'>{ t('from') }</div>
							<div className='text-2xl font-bold'>{ min_price } ₴</div>
						</div>
						<div className='flex text-sm text-gray-500'>
							<div>{ t('from') }</div>
							<div className='font-bold mx-1'>{ min_price * 4 } ₴</div>
							<div>за 4 шт.</div>
						</div>
					</div>
					<Button className='uppercase font-bold' onPress={ handleClick } color='primary' radius='full' size='lg'>
						<Icons.CartIcon className='stroke-white'/>
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
};

export default ProductCard;
