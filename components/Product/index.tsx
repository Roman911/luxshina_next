'use client'
import { Link } from '@/i18n/routing';
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import ImagesBlock from './ImagesBlock';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeSection } from '@/store/slices/filterSlice';
import { Language } from '@/models/language';
import { ProductProps } from '@/models/product';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import ActionsBlock from '@/components/Product/ActionsBlock';
import { Section } from '@/models/filter';
import Rating from '@/components/UI/Rating';
import CountryInfo from '@/components/UI/CountryInfo';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import Quantity from '@/components/UI/Quantity';
import DeliveryCalculation from '@/components/Product/DeliveryCalculation';
import { addCart } from '@/store/slices/cartSlice';
import QuickOrder from '@/components/Product/QuickOrder';
import CharacteristicsBlock from '@/components/Product/CharacteristicsBlock';
import InfoBlock from '@/components/Product/InfoBlock';
import { SettingsProps } from '@/models/settings';
import OnlineInstallment from './OnlineInstallment';
import './index.scss';
import { onAddToCart, onItemView } from '@/event';

interface Props {
	idProduct: string
	locale: Language
	data: ProductProps
	section: Section
	settings: SettingsProps
}

const ProductComponent: FC<Props> = ({ idProduct, locale, data, section, settings }) => {
	const dispatch = useAppDispatch();
	const [ offerId, setOfferId ] = useState(0);
	const [ quantity, setQuantity ] = useState(1);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const t = useTranslations('Main');
	const { id = 0, full_name = '', offers = [], min_price = 0, photo, model, labels, offer_group } = data?.data || {};
	const offer = offers.find(item => item.offer_id === offerId);
	const review = data?.data.review;
	const commentsAvgRateSum = review && review.length > 0
		? review.reduce((sum, current) => sum + (current.score || 0), 0) : 0;
	const averageScore = review && review.length > 0 ? commentsAvgRateSum / review.length : undefined;

	useEffect(() => {
		onItemView(data?.data, t(section));
	}, [data?.data, section, t]);

	useEffect(() => {
		const storage = getFromStorage('reducerRecentlyViewed');
		const updatedStorage = storage.filter((item: { id: number, section: Section }) => item.id !== Number(idProduct));
		const deleteElement = updatedStorage.length === 4 ? updatedStorage.slice(1, 3) : updatedStorage;
		addToStorage('reducerRecentlyViewed', [ ...deleteElement, { id: idProduct, section: section } ]);
	}, [id, idProduct, section]);

	useEffect(() => {
		if(data) setOfferId(data.data.offers[0].offer_id);
	}, [ data ]);

	useEffect(() => {
		if(data) {
			if(section === 'disks') {
				dispatch(changeSection(Section.Disks));
			}
		}
	}, [ data, dispatch, section ]);

	const handleClick = (id: number) => {
		setOfferId(id);
		setQuantity(1);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < Number(offer?.quantity) ? numericValue : Number(offer?.quantity));
	}

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const onSubmit = () => {
		onAddToCart(data?.data, t(section), quantity);
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: offerId, section, quantity } ];
		dispatch(addCart({ id: offerId, section, quantity }));
		addToStorage('reducerCart', cart);
	}

	return (
		<section className='product-page flex flex-col lg:flex-row justify-between gap-1 xl:gap-x-6 mt-4 md:mt-6'>
			<div className='max-w-[900px] flex-1 pr-3 xl:pr-5'>
				{ data.result &&
					<div className='flex flex-col md:flex-row items-center md:items-start md:border-b border-gray-200'>
						<ImagesBlock
							labels={ labels }
							locale={ locale }
							images={ data.data.photos.urls || [] }
							photo={ photo }
							full_name={ full_name }
							vehicle_type={ data.data.offer_group.vehicle_type }
							season={ model.season }
						/>
						<ActionsBlock className='flex md:hidden' id={ id } section={ section } quantity={ quantity } productName={ full_name } />
						<div className='flex-1 md:ml-6 xl:ml-10'>
							<h1 className='text-2xl font-bold mt-8 md:mt-0'>{ full_name }</h1>
							<div className='flex mt-5 items-center'>
								<div className='text-[15px] text-gray-500 bg-blue-50 rounded-full py-1 md:py-2 px-3 mr-5'>
									Артикул: { offer_group?.sku }
								</div>
								<Rating
									commentsCount={ review ? (review.length > 0 ? review.length : undefined) : undefined }
									commentsAvgRate={ averageScore || 0 }
								/>
							</div>
							<div className='flex justify-between mt-7 md:mt-11'>
								<div>
									<div className='flex items-end'>
										<div className='mr-2.5 text-xl font-medium'>{ t('from') }</div>
										<div className='text-4xl font-bold mr-2.5'>{ min_price } ₴</div>
										<div className='text-xl font-medium'>/шт.</div>
									</div>
									<div className='mt-3 text-gray-500'>
										{ t('from') } <span className='font-bold'>{ min_price * 4 } ₴ </span> за 4 шт.
									</div>
								</div>
								<ActionsBlock className='hidden md:flex' id={ id } section={ section } quantity={ quantity } productName={ full_name } />
							</div>
							<div className='offers mt-7 mb-5'>
								{ offers.map(item => {
									return <div
										key={ item.offer_id }
										onClick={ () => handleClick(item.offer_id) }
										className='offers__item cursor-pointer grid-cols-3 grid md:grid-cols-7 gap-1 md:gap-4 items-center mt-3 py-2.5 md:py-0 px-2.5 md:px-0 bg-white md:bg-transparent border md:border-0 rounded-full'
									>
										<div className='input flex flex-row md:col-span-2 relative'>
											<input
												type="checkbox"
												onChange={ () => handleClick(item.offer_id) }
												checked={ item.offer_id === offerId }
												className='appearance-none h-6 w-6 bg-white rounded-full border border-zinc-400 hover:border-primary checked:border-primary transition-all duration-200 peer'
											/>
											<div
												className='h-4 w-4 absolute inset-1 rounded-full peer-checked:border-primary peer-checked:bg-primary'
											/>
											<label className='flex ml-1.5 md:ml-7 flex-col justify-center font-medium cursor-pointer'>
												{ item.quantity } шт.
											</label>
										</div>
										<div className='country md:col-span-3'>
											<CountryInfo
												country={ locale === Language.UK ? item.country : item.country_ru }
												countryCode={ countryCodeTransform(item.country) } year={ item.year }
												mobileHidden={ true }
											/>
										</div>
										<div className='price md:col-span-2 font-bold content-center'>
											{ item.price } грн
										</div>
									</div>
								}) }
							</div>
						</div>
					</div> }
				<div className='purchase-information grid justify-self-stretch mt-5 md:mt-10'>
					<div className='mb-4 md:mb-0'>
						<Quantity id={ 0 } quantity={ quantity } offerQuantity={ (Number(offer?.quantity) || 0) }
											price={ offer?.price } onChange={ onChange } setQuantity={ onSetQuantity }/>
						<DeliveryCalculation offer_id={ offerId }/>
					</div>
					<div className='buttons-buy md:justify-self-end flex flex-col gap-4'>
						{ cartItems.find(item => item.id === offerId) ?
							<Button as={ Link } href={ `/cart` } color='success' size='lg' radius='full' className='uppercase font-bold w-full md:w-72 text-white'>
								{ t('go to cart') }
							</Button> :
							<Button onPress={ onSubmit } color='primary' radius='full' size='lg' className='uppercase font-bold w-full md:w-72'>
								{ t('buy') }
							</Button>
						}
						<QuickOrder locale={ locale } offerId={ offerId } quantity={ quantity } section={ section }
												fullName={ full_name } brand={ data?.data?.brand.name } model={ model.name }
												offerItem={ data?.data?.offers?.find(item => item.offer_id === offerId) }
						/>
						<OnlineInstallment locale={ locale } settings={ settings } />
					</div>
				</div>
				<CharacteristicsBlock locale={ locale } data={ data } />
			</div>
			<InfoBlock settings={ settings } />
		</section>
	)
};

export default ProductComponent;
