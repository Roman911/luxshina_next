'use client'
import { useTranslations } from 'next-intl';
import { addToStorage, getFromStorage, removeFromStorage, resetStorage } from '@/lib/localeStorage';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAppGetProducts } from '@/hooks/getProducts';
import { removeComparison, reset } from '@/store/slices/comparisonSlice';
import { addCart } from '@/store/slices/cartSlice';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import Spinner from '@/components/UI/Spinner';
import NoResult from '@/components/UI/NoResult';
import ComparisonComponent from '@/components/Comparison';

export default function Comparison() {
	const t = useTranslations('Comparison');
	const dispatch = useAppDispatch();
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const { tires, cargo, disks, battery, isLoading} = useAppGetProducts(comparisonItems, 'reducerComparison');

	const path = [
		{
			title: t('comparison'),
			href: '/comparison',
			translations: false
		}
	];

	const handleClick = (id: number) => {
		dispatch(removeComparison(id));
		removeFromStorage('reducerComparison', id)
	}

	const resetEverything = () => {
		dispatch(reset());
		resetStorage('reducerComparison');
	}

	const onClick = (offerId: number, section: string) => {
		console.log('click',offerId, section);
		const cartStorage = getFromStorage('reducerCart');
		const cart = [ ...cartStorage, { id: offerId, section, quantity: 1 }];
		dispatch(addCart({ id: offerId, section, quantity: 1 }));
		addToStorage('reducerCart', cart);
	}

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title={ t('comparison') } />
			{comparisonItems.length > 0 ? <Spinner height='h-40' show={ isLoading } >
				<ComparisonComponent
					defaultTab={ tires.length > 0 ? 'tires' : cargo.length > 0 ? 'cargo' : disks.length > 0 ? 'disks' : 'battery' }
					tires={ tires }
					cargo={ cargo }
					disks={ disks }
					battery={ battery }
					resetEverything={ resetEverything }
					handleClick={ handleClick }
					onClick={ onClick }
				/>
			</Spinner> : <NoResult noResultText='any products to comparison yet' />}
		</LayoutWrapper>
	)
};
