'use client'
import Image from 'next/image';
import { FC } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Button } from '@heroui/button';
import * as Icons from '@/components/UI/Icons';
import { SettingsProps } from '@/models/settings';
import { Language, LanguageCode } from '@/models/language';
import { twMerge } from 'tailwind-merge';

interface Props {
	isTopLine: boolean
	settings: SettingsProps
	isInfo?: boolean
}

const Contacts: FC<Props> = ({ isTopLine, settings, isInfo }) => {
	const t = useTranslations('Main');
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell" | undefined }[] = [
		{ phone: settings[lang].config_telephone_besk, url: settings[lang].config_telephone_besk_url, logo: undefined },
		{ phone: settings[lang].config_telephone_vodafone, url: settings[lang].config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings[lang].config_telephone_kievstar, url: settings[lang].config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings[lang].config_telephone_life, url: settings[lang].config_telephone_life_url, logo: 'lifecell' },
	];

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant='light'>
					<div className={ twMerge('pt-2 pb-1 pl-2 pr-1', isTopLine && 'bg-primary rounded-full', isInfo && 'p-0') }>
						<Icons.PhoneIcon className={ twMerge('fill-black', isTopLine && 'fill-white', isInfo && 'fill-primary') } />
					</div>
					{ !isTopLine && !isInfo && <>
						<div className='font-bold hidden lg:block'>
							<a href={`tel:${telephones[0].url}`}>
								{telephones[0].phone}
							</a>
						</div>
						<div className='hidden lg:block'>({ t('free') })</div>
					</>
					}
					{ isInfo && <div className='uppercase font-bold text-medium'>{ t('phones') }</div> }
					<Icons.ChevronDownIcon className={twMerge('h-4 w-4 stroke-black', isTopLine && 'stroke-white')} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Dynamic Actions" items={telephones}>
				{(item) => (
					<DropdownItem
						key={ item.phone }
						startContent={ item.logo ? <Image width={ 24 } height={ 24 } src={`/icons/${item.logo}-logo.svg`} alt=''/> :
							<Icons.PhoneIcon className='fill-primary' /> }
					>
						<a href={`tel:${item.url}`} className='ml-2.5 font-medium'>
							{item.phone}
						</a>
						{ !item.logo && <div>{t('free in ukraine')}</div> }
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	)
};

export default Contacts;
