import { FC } from 'react';
import * as Icons from '@/components/UI/Icons';
import { twMerge } from 'tailwind-merge';
import { addBookmarks, removeBookmarks } from '@/store/slices/bookmarksSlice';
import { addComparison, removeComparison } from '@/store/slices/comparisonSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import { Button } from '@heroui/button';

const toggleStorageItem = (storageKey: string, id: number, section: string, isInStorage: boolean) => {
	if(isInStorage) {
		removeFromStorage(storageKey, id);
	} else {
		const storage = getFromStorage(storageKey) || [];
		addToStorage(storageKey, [ ...storage, { id, section } ]);
	}
};

interface Props {
	group: number
	className: string
	sectionNew: Section.Disks | 'cargo' | 'tires'
}

const ActionsBlock: FC<Props> = ({ group, className, sectionNew }) => {
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const isBookmarks = bookmarksItems.some(i => i.id === group);
	const isComparison = comparisonItems.some(i => i.id === group);

	const handleToggle = (
		id: number,
		isItem: boolean,
		addAction: ({ id, section }: { id: number, section: string }) => {
			type: string,
			payload: { id: number, section: string }
		}, // Ensure actions return objects
		removeAction: (id: number) => { type: string, payload: number },
		storageKey: string
	) => {
		dispatch(isItem ? removeAction(id) : addAction({ id, section: sectionNew }));
		toggleStorageItem(storageKey, id, sectionNew, isItem);
	};

	const addToDefense = () => {
		handleToggle(group, isBookmarks, addBookmarks, removeBookmarks, 'reducerBookmarks')
	}

	const addToComparison = () => {
		handleToggle(group, isComparison, addComparison, removeComparison, 'reducerComparison')
	}

	return (
		<div className={ twMerge('absolute right-0 group-hover:visible flex-col z-10', className) }>
			<Button isIconOnly onPress={ addToDefense } radius='full' variant='light' color='primary' aria-label='Bookmarks'
							className='group hover:bg-gray-100 rounded-md'>
				<Icons.HeartIcon className={
					twMerge('stroke-[#8D8E90] group-hover:stroke-primary', isBookmarks && 'stroke-primary fill-primary')
				}/>
			</Button>
			<Button isIconOnly onPress={ addToComparison } radius='full' variant='light' color='primary' aria-label='Comparison'
							className='group hover:bg-gray-100 rounded-md'>
				<Icons.LibraIcon className={
					twMerge('fill-[#8D8E90] group-hover:fill-primary', isComparison && 'fill-primary')
				}/>
			</Button>
		</div>
	)
};

export default ActionsBlock;
