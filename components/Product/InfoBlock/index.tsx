import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import * as Icons from '../../UI/Icons';
import { Language, LanguageCode } from '@/models/language';
import { SettingsProps } from '@/models/settings';
import OurAdvantages from '@/components/Home/OurAdvantages';
import Contacts from '@/components/Layout/Header/Contacts';

const InfoBlock = ({ settings }: { settings: SettingsProps }) => {
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const t = useTranslations('InfoBlock');

	return <div className='lg:w-80'>
		<div className=' bg-white rounded-2xl px-5 py-7'>
			<div className='font-bold'>{ t('order by number') }:</div>
			<Contacts isTopLine={ false } settings={ settings } isInfo={ true }/>
			<div className='flex items-center gap-x-2.5 mt-2'>
				<Icons.EmailIcon className='fill-black'/>
				<a href={ `mailto:${ settings.ua.config_email }` } className='ml-2.5 font-bold'>
					{ settings.ua.config_email }
				</a>
			</div>
			<div className='mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap'>
				{ settings[lang].config_address }
			</div>
			<Link href='/page/shipment' className='mt-4 flex items-center gap-x-2.5 font-medium text-primary group'>
				<Image width={ 20 } height={ 20 } src='/icons/infoblock/delivery-icon.svg' alt='' />
				<span className='group-hover:underline'>{ t('delivery') }</span>
			</Link>
			<Link href='/page/payment' className='mt-4 flex items-center gap-x-2.5 font-medium text-primary group'>
				<Image width={ 20 } height={ 20 } src='/icons/infoblock/payment-icon.svg' alt='' />
				<span className='group-hover:underline'>{ t('payment') }</span>
			</Link>
			{/*<Link href='/page/garantiya-ta-povernennya' className='mt-4 flex items-center gap-x-2.5 font-medium text-primary group'>*/}
			{/*	<Image width={ 20 } height={ 20 } src='/icons/infoblock/guarantee-icon.svg' alt='' />*/}
			{/*	<span className='group-hover:underline'>{ t('warranty and returns') }</span>*/}
			{/*</Link>*/}
		</div>
		<OurAdvantages size='small'/>
	</div>
};

export default InfoBlock;
