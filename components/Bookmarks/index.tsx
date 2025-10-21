'use client';
import Spinner from '@/components/UI/Spinner';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';
import { useAppSelector } from '@/hooks/redux';
import { useAppGetProducts } from '@/hooks/getProducts';

const BookmarksWrapper = () => {
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { products, isLoading } = useAppGetProducts(bookmarksItems, 'reducerBookmarks');

	if(bookmarksItems.length === 0) return <NoResult noResultText='any products to favorites yet' />;

	return (
		<Spinner height='h-40' show={ isLoading }>
			<ProductList
				classnames='grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
				data={ { products, total_count: products.length } }
			/>
		</Spinner>
	)
};

export default BookmarksWrapper;
