import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LinkComponent from '../LinkComponent';
import Title from '../Title';
import { carBrandsLinks, typeDiskLinks } from './links';
import { IMenu } from '@/models/menu';
import { changeSubsection } from '@/store/slices/filterSlice';
import { Subsection } from '@/models/filter';
import { useAppDispatch } from '@/hooks/redux';

const CarDiskFilter = ({ onClick, menu }: { onClick?: () => void, menu: IMenu[] }) => {
	const t = useTranslations('HeaderFilter');
	const dispatch = useAppDispatch();

	return <>
		<div>
			<Title title={ t('by disk type') }/>
			{ typeDiskLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					onClick={ onClick }
					href={ item.href }
					label={ t(item.label) }
					mt={ item.mt }
					border={ false }
				/>
			}) }
		</div>
		<div>
			<Title title={ t('by brands') }/>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{ menu[1].manufs?.map(item => {
					return <LinkComponent
						key={ item.manufacturer_id }
						onClick={ onClick }
						href={ item.alias }
						label={ item.name }
						border={ false }
					/>
				}) }
			</div>
			<Link
				onClick={ onClick }
				href='/katalog/diski'
				className='text-primary font-bold hover:underline'
			>
				{ t('all brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by car brands') }/>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{ carBrandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						onClick={ onClick }
						href={ item.href }
						label={ item.label }
						border={ false }
					/>
				}) }
			</div>
			<Link
				onClick={ () => dispatch(changeSubsection(Subsection.ByCars)) }
				href='/katalog/diski'
				className='text-primary font-bold hover:underline'
			>
				{ t('all car brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<div>
				<Title title={ t('by diameter') }/>
				<div className='mt-6 mb-6 grid grid-cols-3 md:grid-cols-4 gap-1.5 max-w-64 pr-2.5'>
					{ menu[1].radius.map(item => {
						return <LinkComponent
							key={ item.radius }
							onClick={ onClick }
							href={ item.alias }
							border={ true }
							label={ item.name }
						/>
					}) }
				</div>
			</div>
		</div>
	</>
};

export default CarDiskFilter;
