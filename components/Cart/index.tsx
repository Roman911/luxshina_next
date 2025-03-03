'use client'
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import CartItem from './CartItem';
import type { ProductsProps } from '@/models/products';
import { Language } from '@/models/language';

const totalQuantityLabel = {
	1: {
		uk: 'товар на суму:',
		ru: 'товар на сумму',
	},
	2: {
		uk: 'товара на суму:',
		ru: 'товара на сумму',
	},
	3: {
		uk: 'товарів на суму:',
		ru: 'товаров на сумму:',
	},
};

interface CarProps {
	data: ProductsProps | undefined
	removeProduct: (id: number) => void
	cartItems: { id: number; quantity: number }[]
	setQuantity: (id: number, quantity: number) => void
}

const CartComponent: FC<CarProps> = ({ data, cartItems, removeProduct, setQuantity }) => {
	const { locale } = useParams<{ locale: Language.UK | Language.RU }>();
	const items = data?.data.products.map(item => {
		const id = item.best_offer.id;
		const price = item.best_offer.price;
		const quantity = cartItems.find(i => i.id === id)?.quantity;

		return { id, price, quantity }
	});

	const totalQuantity = items?.length;
	const totalQuantityPrice = items?.reduce((sum, item) => sum + (item.quantity ?? 0) * parseFloat(item.price), 0);

	return <div className='flex flex-col lg:flex-row bg-white p-5 rounded-sm shadow-sm gap-10'>
		<div className='flex-1 divide-y'>
			{data?.data.products.map(item => {
				const quantity = cartItems?.find(i => i.id === item.best_offer.id)?.quantity || 1;

				return <CartItem
					key={ item.group }
					id={ item.best_offer.id }
					pageUrl={ item.page_url }
					quantity={ quantity }
					sku={ item.sku }
					default_photo={ item.default_photo }
					full_name={ item.full_name }
					price={ item.best_offer.price }
					country={ item.best_offer.country }
					country_ru={ item.best_offer.country_ru }
					year={ item.best_offer.year }
					offerQuantity={ item.offers[0]?.quantity }
					removeProduct={ removeProduct }
					setQuantity={ setQuantity }
					locale={ locale }
				/>
			})}
		</div>
		<div className='w-full lg:w-72 bg-blue-50 py-6 px-5 h-max'>
			<div className='flex justify-between'>
				<div>
					{ totalQuantity }
					{ ' ' }
					{
						totalQuantity === 1
							? totalQuantityLabel[1][locale]
							: (totalQuantity && totalQuantity > 1 && totalQuantity < 5)
								? totalQuantityLabel[2][locale]
								: totalQuantityLabel[3][locale]
					}
				</div>
				<div>{ totalQuantityPrice } ₴</div>
			</div>
			<div className='font-bold mt-4 flex justify-between'>
				<div>{ locale === Language.UK ? 'Разом до сплати:' : 'Итого к оплате:' }</div>
				<div>{ totalQuantityPrice } ₴</div>
			</div>
			<Link className='btn primary w-full mt-6' href='/order'>
				{ locale === Language.UK ? 'Оформити замовлення' : 'Оформить заказ' }
			</Link>
		</div>
	</div>
};

export default CartComponent;
