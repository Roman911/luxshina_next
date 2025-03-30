import { FC } from 'react';
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Checkbox, CheckboxGroup } from '@heroui/checkbox';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { Link } from '@/i18n/routing';
import { Section } from '@/models/section';

interface Props {
	checkboxKey: string;
	label: string;
	slug: string[];
	section: Section;
	options: { value: string; label: string }[];
}

const MyCheckboxGroup: FC<Props> = ({ checkboxKey, label, slug, section, options }) => {
	const dispatch = useAppDispatch();
	const slugTransform = slug?.map(item => decodeURIComponent(item));
	const keyPattern = new RegExp(`^${checkboxKey}[\\w\u0400-\u04FF.()]+$`);
	const filteredArr = slugTransform ? slugTransform.filter(item => !keyPattern.test(item)) : [];
	const found = slugTransform?.find(item => keyPattern.test(item));
	const defaultValue = found ? [ found.split('-')[1] ] : [];

	return (
		<CheckboxGroup defaultValue={ defaultValue } label={ label } classNames={ { label: 'mt-4 font-bold text-black' } }
									 orientation='vertical'>
			<ScrollShadow hideScrollBar className="w-[300px] max-h-[400px]">
				{ options.map(({ value, label }) => (
					<Link
						key={ value }
						className='w-full flex mt-2'
						onClick={ () => dispatch(setProgress(true)) }
						href={ `/catalog/${ section }/${ checkboxKey }${ value }/${ checkboxKey === 's-' ? filteredArr.filter(item => item !== 'stud-1').join('/') : filteredArr.join('/') }` }
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