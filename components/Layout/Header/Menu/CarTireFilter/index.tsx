import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import TypeCarLinks from '@/components/UI/TypeCarLinks';
import LinkComponent from '../LinkComponent';
import Title from '../Title';
import { brandsLinks, diameterLinks, seasonLinks } from './links';

const CarTireFilter = () => {
	const t = useTranslations('HeaderFilter');

	return <>
		<div>
			<Title title={ t('by season') }/>
			{ seasonLinks.map(item => {
				return <LinkComponent
					key={ item.label }
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
				{ brandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						href={ item.href }
						label={ item.label }
						border={ false }
					/>
				}) }
			</div>
			<Link
				href='/catalog/tires'
				className='text-primary font-bold uppercase hover:underline'
			>
				{ t('all brands') }
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by diameter') }/>
			<div className='mt-6 mb-6 grid grid-cols-3 md:grid-cols-4 gap-1.5 max-w-64 pr-2.5'>
				{ diameterLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						href={ item.href }
						border={ item.border }
						label={ item.label }
					/>
				}) }
			</div>
		</div>
	</>
};

export default CarTireFilter;
