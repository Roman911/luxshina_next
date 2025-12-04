'use client';
import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';
import { Input } from '@heroui/react';

interface Props {
	phoneErrorMessage: null | string;
	setPhoneErrorMessage?: Dispatch<SetStateAction<string | null>>;
}

const codes = [ '50', '63', '66', '67', '68', '73', '77', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99' ];

const PhoneMaskInput = forwardRef<HTMLInputElement, Props>(({ phoneErrorMessage, setPhoneErrorMessage }, ref) => {
	const t = useTranslations('PhoneMask');
	const [phone, setPhone] = useState<string | null>(null);
	const [isDesktop, setIsDesktop] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsDesktop(window.innerWidth >= 768);
		}
	}, []);

	const handleChangeAmount = (values: { value: string }) => {
		let newValue = values.value;

		if (phoneErrorMessage && setPhoneErrorMessage) {
			setPhoneErrorMessage(null);
		}

		if (newValue.length >= 2) {
			const code2 = newValue.slice(0, 2);

			if (!codes.includes(code2)) {
				newValue = newValue.slice(2);
			}
		}

		setPhone(newValue);
	};

	return (
		<PatternFormat
			label={t('phone number')}
			isRequired
			isInvalid={!!phoneErrorMessage && phone?.length !== 10}
			errorMessage={phoneErrorMessage && t(phoneErrorMessage)}
			format="+38 (0##)###-##-##"
			allowEmptyFormatting
			mask="_"
			value={phone}
			onValueChange={handleChangeAmount}
			customInput={Input}
			aria-label="input-monto"
			name="phone"
			{...(isDesktop && ref ? { getInputRef: ref } : {})}
		/>
	);
});

PhoneMaskInput.displayName = 'PhoneMaskInput';
export default PhoneMaskInput;
