import { Link } from '@/i18n/routing';
import { twMerge } from 'tailwind-merge';
import { Section } from '@/models/filter';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/hooks/redux';
import { reset } from '@/store/slices/filterIsOpenSlice';

const SwitchTabs = ({ section, car }: { section: Section, car: string | null }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const renderTab = (value: Section, isActive: boolean) => {
		const url = `/katalog/${ value }${ car ? `/${ car }` : '' }`;

		return (
			<Link
				onClick={ () => dispatch(reset()) }
				href={ url }
				className={ twMerge(
					'text-sm font-bold uppercase py-3.5 rounded-t-sm border border-slate-200 border-b-0 text-center bg-white',
					isActive && 'bg-slate-200 text-gray-400'
				) }
			>
				{ t(value) }
			</Link>
		);
	};

	return (
		<div className='filter-tabs grid grid-cols-2 gap-2.5 -mb-0.5'>
			{ renderTab(Section.Tires, section === Section.Disks) }
			{ renderTab(Section.Disks, section !== Section.Disks) }
		</div>
	)
};

export default SwitchTabs;
