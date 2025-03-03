import { FC } from 'react';
import { SettingsProps } from '@/models/settings';
import Title from '@/components/UI/Title';
import PopularSizes from './PopularSizes';
import PopularBrands from './PopularBrands';
import { Language, LanguageCode } from '@/models/language';
import { FeatureParamsProps } from '@/models/featureParams';

interface Props {
	locale: Language
	settings: SettingsProps
	featureParams: FeatureParamsProps
}

const PopularSizesBlock: FC<Props> = ({ locale, settings, featureParams }) => {
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	return (
		<>
			<div className='mt-28'>
				<Title title={ settings[lang].h2_popular_tyre }/>
				<PopularSizes data={ featureParams.ProductTiporazmer } />
			</div>
			<div className='mt-24'>
				<Title title={ settings[lang].h2_popular_auto }/>
				<PopularBrands data={ featureParams.Car2Brand } />
			</div>
		</>
	)
};

export default PopularSizesBlock;
