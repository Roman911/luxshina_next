'use client';
import { FC, useCallback, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge, Checkbox, CheckboxGroup } from '@heroui/react';
import * as Icons from '@/components/UI/Icons';
import SearchInput from './SearchInput';
import type { Brand } from '@/models/baseData';
import { Link } from '@/i18n/routing';
import { Section } from '@/models/section';

interface SelectProps {
	brand?: Brand | null | undefined
	checkboxKey: string;
	filterValue?: string[];
	focusValue?: string | false;
	label: string;
	options: { value: string; label: string }[];
	section: Section;
	search?: boolean;
	slug: string[];
	variant: 'white' | 'gray';
}

export const Select: FC<SelectProps> = (
	{
		brand,
		checkboxKey,
		filterValue,
		focusValue,
		label,
		options,
		section,
		search,
		slug,
		variant
	}) => {
	const [ open, setOpen ] = useState(false);
	const [ eventSearch, setEventSearch ] = useState('');
	const ref = useRef<HTMLDivElement | null>(null);
	const slugTransform = slug?.map(item => decodeURIComponent(item));
	const keyPattern = new RegExp(`^${checkboxKey}[\\w\u0400-\u04FF.()]+$`);
	const filteredArr = slugTransform ? slugTransform.filter(item => !keyPattern.test(item)) : [];
	const found = slugTransform?.find(item => keyPattern.test(item));
	let season = undefined;
	if(slug?.includes('litni')) {
		season = [ 'litni' ];
	} else if(slug?.includes('zimovi')) {
		season = [ 'zimovi' ];
	} else if(slug?.includes('vsesezonnye')) {
		season = [ 'vsesezonnye' ];
	} else if(slug?.includes('shipovani')) {
		season = [ 'zimovi' ];
	}
	const defaultValue = found ? [ found.split('-')[1] ] : [];
	let checked;

	if(checkboxKey === 's-') {
		checked = season ? season : defaultValue;
	} else if(checkboxKey === 'b-') {
		checked = brand ? [ brand.alias ] : defaultValue;
	} else {
		checked = defaultValue;
	}

	const handleClickOpen = useCallback(() => {
		setOpen(prev => !prev);

		if(focusValue && ref.current) {
			const cont = ref.current.querySelectorAll('label');
			const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);
			if(elIndex !== -1) {
				setTimeout(() => {
					ref.current?.scroll(0, elIndex * 28);
				}, 15);
			}
		}
	}, [ focusValue ]);

	const handleChange = (value: string) => {
		setEventSearch(value.toLowerCase());
	}

	return <div
		className={ twMerge('relative mt-2 rounded-sm bg-white z-10', variant === 'gray' && 'bg-zinc-200') }>
		<Badge isInvisible={ !filterValue?.length } className='border-white'
					 classNames={ { base: 'w-full', badge: 'left-[1%]' } } color='primary' content={ filterValue?.length }
					 placement='top-left'>
			<button
				type='button'
				onClick={ () => handleClickOpen() }
				className={ twMerge(
					'relative w-full cursor-default py-2.5 pr-10 text-left focus:outline-none pl-1.5 text-sm',
					variant === 'gray' ? 'text-black' : '',
					variant === 'white' ? 'font-bold' : 'pl-3.5')
				}>
      <span className='flex items-center m-'>
        <span className='block truncate'>{ label }</span>
      </span>
				<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2.5">
        <Icons.ChevronDownIcon
					className={ twMerge('w-3.5 h-3.5 stroke-black', variant === 'gray' && 'stroke-gray-500') }/>
      </span>
			</button>
		</Badge>
		{ search && open && <SearchInput value={ eventSearch } handleChange={ handleChange }/> }
		<CheckboxGroup
			ref={ ref }
			defaultValue={ checked }
			className={ twMerge('relative max-h-[480px] w-full overflow-auto px-2.5 pb-4', !open && 'hidden') }
			classNames={ { label: 'mt-4 font-bold text-black' } }
			orientation='vertical'
		>
			{ options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(({ value, label }) => (
				<Link
					key={ value }
					className='w-full flex'
					href={
						`/katalog/
						${ section }/
						${ checkboxKey === 's-' || checkboxKey === 'b-' ? '' : checkboxKey }
						${ checkboxKey === 'b-' ? 'brand/' : '' }${ value }/
						${ checkboxKey === 'b-' ? filteredArr.filter(item => item !== (brand ? brand.alias : '') && item !== 'brand').join('/') : checkboxKey === 's-' ? filteredArr.filter(item => item !== "shipovani").filter(item => item !== 'shipovani' && season ? item !== season[0] : filteredArr.join('/')).join('/') : filteredArr.join('/') }
						` }
				>
					<Checkbox
						className="-z-10"
						radius="sm"
						size="lg"
						value={ value }
						classNames={ {
							label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'),
							wrapper: 'bg-white before:-m-[1px]'
						} }
					>
						{ label }
					</Checkbox>
				</Link>
			)) }
		</CheckboxGroup>
		{ slug && slug.some(item => ['zimovi', 'shipovani'].includes(item)) && <Link
			className={ twMerge('ml-8 flex', !open && 'hidden') }
			href={ `/katalog/${ section }/${ slug ? slug.filter(item => !['zimovi', 'shipovani'].includes(item)).join('/') : '' }/${ slug?.includes('shipovani') ? 'zimovi' : 'shipovani' }` }>
			<Checkbox
				className="-z-10"
				radius="sm"
				size="lg"
				isSelected={ slug?.includes('shipovani') }
				classNames={ {
					label: twMerge('text-black text-base', variant === 'white' && 'dark:text-white'),
					wrapper: 'bg-white before:-m-[1px]'
				} }
			>
				Шип
			</Checkbox>
		</Link> }
	</div>
};
