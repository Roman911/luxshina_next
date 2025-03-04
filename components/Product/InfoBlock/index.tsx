import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import * as Icons from '../../UI/Icons';
import { Language, LanguageCode } from '@/models/language';
// import Contacts from '@/components/Layout/Header/TopLine/Contacts';
import { SettingsProps } from '@/models/settings';
import OurAdvantages from '@/components/Home/OurAdvantages';

const InfoBlock = ({ settings }: { settings: SettingsProps }) => {
	const locale = useLocale();
	const t = useTranslations('InfoBlock');

	return <div className='lg:w-80'>
		<div className=' bg-white rounded-2xl px-5 py-7'>
			{/*<Contacts isInfo={ true } settings={ settings }/>*/}
			<div className='flex items-center gap-x-2.5 mt-2'>
				<Icons.EmailIcon className='fill-black'/>
				<a href={ `mailto:${ settings.ua.config_email }` } className='ml-1 font-bold'>
					{ settings.ua.config_email }
				</a>
			</div>
			<div className='mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap'>
				{ settings[locale === Language.UK ? LanguageCode.UA : Language.RU].config_address }
			</div>
			<Link href='/page/shipment'
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-teal-600 hover:underline'>
				<Icons.DeliveryIcon className='fill-[#868D9A]'/>
				<span className='group-hover:underline'>{ t('delivery') }</span>
			</Link>
			<Link href='/page/payment'
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-teal-600 hover:underline'>
				<Icons.PaymentIcon className='fill-[#868D9A]'/>
				<span className='group-hover:underline'>{ t('payment') }</span>
			</Link>
			<Link href='/page/garantiya-ta-povernennya'
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-teal-600 hover:underline'>
				<Icons.GuaranteeIcon className='fill-[#868D9A]'/>
				<span className='group-hover:underline'>{ t('warranty and returns') }</span>
			</Link>
		</div>
		<OurAdvantages size='small'/>
	</div>
};

export default InfoBlock;
