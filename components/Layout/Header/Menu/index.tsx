'use client';
import { FC, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import CarTireFilter from './CarTireFilter';
import CarDiskFilter from './CarDiskFilter';
import * as Icons from '@/components/UI/Icons';
import { Button } from '@heroui/react';
import { Section } from '@/models/section';
import { IMenu } from '@/models/menu';
import { Language, LanguageCode } from '@/models/language';

interface Props {
	menu: IMenu[]
}

const Navbar: FC<Props> = ({ menu }) => {
	const locale = useLocale();
	const [reset, setReset] = useState(false);
	const t = useTranslations('Main');
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const handleClick = () => {
		setReset(true);
		setTimeout(() => {
			setReset(false);
		}, 100)
	}

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<div className='group'>
			<Button
				as={ Link }
				href={ `/katalog/${sectionItem}` }
				variant='light'
				size='lg'
				radius='none'
				className='uppercase font-bold h-16 group-hover:text-primary'
				endContent={ <Icons.ChevronDownIcon
					width='14'
					height='14'
					strokeWidth='2'
					className='stroke-black transition group-hover:stroke-primary group-hover:rotate-180'
				/> }>
				{ label }
			</Button>
			<div
				className={ twMerge('absolute container left-1/2 top-16 z-30 w-full -translate-x-1/2 px-4 hidden group group-hover:flex', reset && 'hidden') }>
				<div
					className='w-full flex-auto overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 py-8 px-12 grid grid-cols-4'>
					{ sectionItem === Section.Tires ? <CarTireFilter onClick={ handleClick } menu={ menu } /> : <CarDiskFilter onClick={ handleClick } menu={ menu } /> }
				</div>
			</div>
		</div>
	)

	return (
		<div className='bg-white hidden lg:block relative'>
			<nav className='container mx-auto max-w-7xl flex justify-between items-center uppercase font-bold gap-8 px-5'>
				{[{ section: 'avtoshini', label: t('cartires') }, { section: 'diski', label: t('cardiscs') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ menu.slice(2).map((item, index) => {
					return <Link key={ index } href={ item.alias }
											 className='hover:text-primary'>
						{ item.descriptions[lang].title }
					</Link>
				}) }
			</nav>
		</div>
	)
};

export default Navbar;
