import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { AliasAll } from '@/models/alias';
import { Language } from '@/models/language';

interface Props {
	alias: AliasAll
}

const Menu: FC<Props> = ({ alias }) => {
	const t = useTranslations('Main');
	const locale = useLocale();

	return (
		<nav className='gap-2 2xl:gap-5 items-center hidden lg:flex ml-auto mr-4'>
			{ alias.header.map((item, index) => {
				return <Link
					key={ index }
					href={ `/page/${item.slug}` }
					className='text-xs 2xl:text-sm font-medium uppercase'>
					{ item.descriptions[locale === Language.UK ? 'ua' : 'ru'].title }
				</Link>
			}) }
			<Link
				href='/tyre-disk-size-calc'
				className='text-xs 2xl:text-sm font-medium uppercase'>
				{ t('tire calculator') }
			</Link>
		</nav>
	)
};

export default Menu;
