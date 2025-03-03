'use client'
import { FC } from 'react';
import { useLocale } from 'next-intl';
import DOMPurify from 'isomorphic-dompurify';
import { SettingsProps } from '@/models/settings';
import Menu from './Menu';
import { AliasAll } from '@/models/alias';
import LanguageChanger from './LanguageChanger';
import Contacts from '../Contacts';
import { Language, LanguageCode } from '@/models/language';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const TopLine: FC<Props> = ({ alias, settings }) => {
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: [ 'iframe' ],
			ADD_ATTR: [ 'allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy' ]
		});

		return (
			<div
				className='ml-2 lg:ml-6 text-sm 2xl:text-base hidden lg:block'
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<section className='top-line w-full bg-black text-white'>
			<div className='container mx-auto flex justify-between py-2 px-4'>
				<div className='md:hidden'>
					<Contacts isTopLine={ true } settings={ settings } />
				</div>
				<div className='flex items-center'>
					<LanguageChanger/>
					<HtmlContent htmlString={settings[lang].config_open} />
				</div>
				<Menu alias={ alias }/>
			</div>
		</section>
	)
};

export default TopLine;
