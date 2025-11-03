import { FC } from 'react';
import { Checkbox, CheckboxGroup, ScrollShadow } from "@heroui/react";
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { Link } from '@/i18n/routing';
import { Section } from '@/models/section';
import type { Brand } from '@/models/baseData';

interface Props {
	checkboxKey: string;
	label: string;
	slug: string[];
	section: Section;
	options: { value: string; label: string }[];
	brand?: Brand | null | undefined
}

const MyCheckboxGroup: FC<Props> = ({ checkboxKey, label, slug, section, options, brand }) => {
	const dispatch = useAppDispatch();
	const slugTransform = slug?.map(item => decodeURIComponent(item));
	const keyPattern = new RegExp(`^${checkboxKey}[\\w\u0400-\u04FF.()]+$`);
	const filteredArr = slugTransform ? slugTransform.filter(item => !keyPattern.test(item)) : [];
	const found = slugTransform?.find(item => keyPattern.test(item));
	let season = undefined;
	if (slug?.includes('litni')) {
		season = ['litni'];
	} else if (slug?.includes('zimovi')) {
		season = ['zimovi'];
	} else if (slug?.includes('vsesezonnye')) {
		season = ['vsesezonnye'];
	} else if (slug?.includes('shipovani')) {
		season = ['zimovi'];
	}
	const defaultValue = found ? [ found.split('-')[1] ] : [];
	let checked;

	if (checkboxKey === 's-') {
		checked = season ? season : defaultValue;
	} else if (checkboxKey === 'b-') {
		checked = brand ? [brand.alias] : defaultValue;
	} else {
		checked = defaultValue;
	}

	return (
		<CheckboxGroup defaultValue={ checked } label={ label } classNames={ { label: 'mt-4 font-bold text-black' } }
									 orientation='vertical'>
			<ScrollShadow hideScrollBar className="w-[300px] max-h-[400px]">
				{ options.map(({ value, label }) => (
					<Link
						key={ value }
						className='w-full flex mt-2'
						onClick={ () => dispatch(setProgress(true)) }
						href={
						`/katalog/
						${ section }/
						${ checkboxKey === 's-' || checkboxKey === 'b-' ? '' : checkboxKey }
						${ checkboxKey === 'b-' ? 'brand/' : ''}${ value }/
						${ checkboxKey === 'b-' ? filteredArr.filter(item => item !== (brand ? brand.alias : '') && item !== 'brand').join('/') : checkboxKey === 's-' ? filteredArr.filter(item => item !== "shipovani").filter(item => item !== 'shipovani' && season ? item !== season[0] : filteredArr.join('/')).join('/') : filteredArr.join('/') }
						`}
					>
						<Checkbox className="-z-10" radius="none" size="lg" value={ value }>
							{ label }
						</Checkbox>
					</Link>
				)) }

			</ScrollShadow>
		</CheckboxGroup>
	);
};

export default MyCheckboxGroup;