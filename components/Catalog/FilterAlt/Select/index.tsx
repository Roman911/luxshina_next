'use client';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge, Checkbox, CheckboxGroup, Spinner } from '@heroui/react';
import * as Icons from '@/components/UI/Icons';
import SearchInput from './SearchInput';
import type { Brand, ManufModels } from '@/models/baseData';
import { Link, useRouter } from '@/i18n/routing';
import { Section } from '@/models/section';
import { IOpenFilter } from '@/models/filter';

interface SelectProps {
	name: string
	brand?: Brand | null | undefined
	model?: ManufModels | null | undefined
	checkboxKey: string;
	filterValue?: string[];
	focusValue?: string | false;
	label: string;
	options: { value: string; label: string }[];
	section: Section;
	search?: boolean;
	slug: string[];
	variant: 'white' | 'gray';
	isOpened?: boolean
	scroll?: number | null
	handleScrollAction?: (name: keyof IOpenFilter, value: number) => void
	handleClickAction: (name: keyof IOpenFilter, value: boolean) => void
}

export const Select: FC<SelectProps> = (
	{
		name,
		brand,
		model,
		checkboxKey,
		filterValue,
		focusValue,
		label,
		options,
		section,
		search,
		slug,
		variant,
		isOpened,
		scroll,
		handleScrollAction,
		handleClickAction,
	}) => {
	const router = useRouter();
	const [ eventSearch, setEventSearch ] = useState('');
	const [ loading, setLoading ] = useState(false);
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
	let diskType = undefined;
	if(slug?.includes('liti')) {
		diskType = [ 'liti' ];
	} else if(slug?.includes('stalni')) {
		diskType = [ 'stalni' ];
	} else if(slug?.includes('kovani')) {
		diskType = [ 'kovani' ];
	}
	const defaultValue = found ? [ found.split('-')[1] ] : [];

	const checked = useMemo(() => {
		switch(checkboxKey) {
			case 's-':
				return season ? season : defaultValue;
			case 'b-':
				return brand ? [ brand.alias ] : defaultValue;
			case 'm-':
				return model ? [ model.alias ] : defaultValue;
			case 'td-':
				return diskType ? diskType : defaultValue;
			default:
				return defaultValue;
		}
	}, [ checkboxKey, season, brand, model, diskType, defaultValue ]);

	// scroll restore
	useEffect(() => {
		if(ref.current && scroll) {
			setTimeout(() => {
				ref.current?.scroll(0, scroll);
			}, 15);
		}
	}, [ scroll ]);

	const handleClickOpen = useCallback(() => {
		handleClickAction(name as keyof IOpenFilter, !isOpened);

		if(focusValue && ref.current) {
			const labels = Array.from(ref.current.querySelectorAll('label'));
			const i = labels.findIndex(el => el.textContent === focusValue);
			if(i !== -1) {
				setTimeout(() => {
					ref.current?.scroll(0, i * 28);
				}, 15);
			}
		}
	}, [ focusValue, handleClickAction, isOpened, name ]);

	const handleChange = (value: string) => {
		setEventSearch(value.toLowerCase());
	}

	const urlSuffix = () => {
		if(checkboxKey === 'b-') {
			return filteredArr.filter(item => item !== (brand ? brand.alias : '') && item !== 'brand').join('/');
		}
		if(checkboxKey === 'm-') {
			return filteredArr.filter(item => item !== (model ? model.alias : '') && item !== 'model').join('/');
		}
		if(checkboxKey === 'td-') {
			return (diskType ? filteredArr.filter(item => item !== diskType[0]) : filteredArr).join('/');
		}
		if(checkboxKey === 's-') {
			return filteredArr
				.filter(item => item !== 'shipovani')
				.filter(item => (season ? item !== season[0] : true))
				.join('/');
		}
		return filteredArr.join('/');
	};

	const createHref = (value: string) => {
		const base = `/katalog/${section}/`;
		const key = [ 's-', 'b-', 'm-', 'td-' ].includes(checkboxKey) ? '' : checkboxKey;
		const currentKeyFull = `${key}${value}`;

		if (slugTransform?.includes(currentKeyFull)) {
			return `${base}${urlSuffix()}`;
		}

		return `${ base }${ key }${ checkboxKey === 'b-' ? 'brand/' : checkboxKey === 'm-' ? 'model/' : '' }${ value }/${ urlSuffix() }`;
	};

	const handleClick = (value: string) => {
		router.push(createHref(value));
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
					'relative w-full cursor-pointer py-2.5 pr-10 text-left focus:outline-none pl-1.5 text-sm',
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
		{ search && isOpened && <SearchInput value={ eventSearch } handleChange={ handleChange }/> }
		<CheckboxGroup
			ref={ ref }
			defaultValue={ checked }
			className={ twMerge('relative max-h-[480px] w-full overflow-auto px-2.5 pb-4', !isOpened && 'hidden') }
			classNames={ { label: 'mt-4 font-bold text-black' } }
			orientation='vertical'
		>
			{ options?.filter(i => i.label.toString().toLowerCase().includes(eventSearch)).map(({ value, label }) => (
				<span
					key={ value }
					className='w-full flex cursor-pointer'
					onClick={ () => {
						setLoading(true);
						if(handleScrollAction && ref.current) {
							handleScrollAction(name as keyof IOpenFilter, ref.current ? ref.current.scrollTop : 0);
						}
						handleClick(value);
					} }
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
				</span>
			)) }
		</CheckboxGroup>
		{ checkboxKey === 's-' && slug && slug.some(item => [ 'zimovi', 'shipovani' ].includes(item)) && <Link
			className={ twMerge('ml-8 flex', !isOpened && 'hidden') }
			href={ `/katalog/${ section }/${ slug ? slug.filter(item => ![ 'zimovi', 'shipovani' ].includes(item)).join('/') : '' }/${ slug?.includes('shipovani') ? 'zimovi' : 'shipovani' }` }>
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
		{ loading && <div className={ twMerge('absolute top-0 left-0 right-0 bottom-0 bg-gray-100/80 flex items-center justify-center') }>
			<Spinner/>
		</div> }
	</div>
};
