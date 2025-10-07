import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import TypeCarLinks from '@/components/UI/TypeCarLinks';
import LinkComponent from '../LinkComponent';
import Title from '../Title';
import { seasonLinks } from './links';
import { IMenu } from '@/models/menu';

const CarTireFilter = ({ onClick, menu }: { onClick?: () => void, menu: IMenu[] }) => {
	const t = useTranslations('HeaderFilter');

	return <>
		<div>
			<Title title={ t('by season') }/>
			{ seasonLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					onClick={ onClick }
					href={ item.href }
					img={ item.img }
					label={ t(item.label) }
					mt={ item.mt }
					border={ false }
				/>
			}) }
		</div>
		<div>
			<Title title={ t('by car type') }/>
			<TypeCarLinks section='header' />
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by brands') }/>
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{ menu[0].manufs?.map(item => {
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
				href='/katalog/avtoshini'
				className='text-primary font-bold uppercase hover:underline'
			>
				{ t('all brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by diameter') }/>
			<div className='mt-6 mb-6 grid grid-cols-3 md:grid-cols-4 gap-1.5 max-w-64 pr-2.5'>
				{ menu[0].radius.map(item => {
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
	</>
};

export default CarTireFilter;
