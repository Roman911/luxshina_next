'use client'
import { useRef, useState, MouseEvent, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import { useClickOutside } from '@/hooks/clickOutside';
import CarTireFilter from './CarTireFilter';
import CarDiskFilter from './CarDiskFilter';
import * as Icons from '@/components/UI/Icons';
import { links } from '../links';

const Navbar = () => {
	const t = useTranslations('Main');
	const [ open, setOpen ] = useState(false);
	const [ section, setSection ] = useState('tires');
	const filterRef = useRef<HTMLDivElement>(null);

	const closeFilter = () => {
		setOpen(false);
	}

	useClickOutside({ ref: filterRef, open, onClose: closeFilter });

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if(section !== value) {
			setSection(value);
		}
	};

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<button
			type='button'
			onClick={ event => handleClick(event, sectionItem) }
			className={
				twMerge('inline-flex items-center gap-x-1.5 font-bold uppercase group transition hover:text-primary outline-none',
					(open && section === sectionItem) && 'text-primary'
				) }
		>
			<span>{ label }</span>
			<span className='transition'>
					<Icons.ChevronDownIcon
						width='14'
						height='14'
						strokeWidth='2'
						className={
							twMerge('stroke-black transition group-hover:stroke-primary',
								(open && section === sectionItem) && 'stroke-primary rotate-180')
						}
					/>
				</span>
		</button>
	)

	return (
		<div className='bg-white hidden lg:block relative'>
			<nav className='container mx-auto max-w-7xl flex justify-between items-center uppercase font-bold gap-8 p-5'>
				{[{ section: 'tires', label: t('cartires') }, { section: 'disks', label: t('cardiscs') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ links.map((item, index) => {
					return <Link key={ index } href={ item.url }
											 className='hover:text-primary'>
						{ t(item.title) }
					</Link>
				}) }
			</nav>
			<div
				ref={ filterRef }
				className={ twMerge('absolute container left-1/2 top-16 z-30 flex w-full -translate-x-1/2 px-4', !open && 'hidden') }>
				<div
					className='w-full flex-auto overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 py-8 px-12 grid grid-cols-4'>
					{ section === 'tires' ? <CarTireFilter closeFilter={ closeFilter } /> :
						<CarDiskFilter closeFilter={ closeFilter } /> }
				</div>
			</div>
		</div>
	)
};

export default Navbar;
