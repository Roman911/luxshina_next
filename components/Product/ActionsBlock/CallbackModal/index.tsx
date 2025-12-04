'use client'
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/UI/Icons';
import { Button, Form, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react';
import { addToast } from '@heroui/toast';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import { baseDataAPI } from '@/services/baseDataService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';

interface Props {
	id: number | undefined
	quantity: number
}

const CallbackModal: FC<Props> = ({ id, quantity }) => {
	const t = useTranslations('CallbackModal');
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const [ createCallback, { isLoading } ] = baseDataAPI.useCreateCallbackMutation();
	const phoneInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if(isOpen) {
			const timeout = setTimeout(() => {
				phoneInputRef.current?.focus();
			}, 100);

			return () => clearTimeout(timeout);
		}
	}, [ isOpen ]);

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const phoneTransform = formatPhoneNumber(phone);

		if(phoneTransform.length < 13) {
			setPhoneErrorMessage('enter your phone number');
		} else {
			await createCallback({
				phone: phoneTransform,
				product_id: id?.toString(),
				quantity: quantity.toString(),
			}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
				if(response?.data?.result) {
					addToast({
						title: t('sent message'),
						description: t('our manager'),
						classNames: { base: 'text-black dark:text-gray-50', title: 'text-black dark:text-gray-50' },
					});
					onClose();
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			});
		}
	}

	return (
		<>
			<Button onPress={ onOpen } isIconOnly aria-label='mail' className='bg-[#E4E9F2] rounded-full group'>
				<Icons.PhoneCircuitIcon className='stroke-black group-hover:stroke-primary'/>
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
									{ t('callback') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<Form
									className='mt-2 mb-8 flex flex-col gap-4'
									onSubmit={ onSubmit }
								>
									<p className="text-sm text-gray-500">
										{ t('put phone') }
									</p>
									<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage } ref={ phoneInputRef } setPhoneErrorMessage={ setPhoneErrorMessage }/>
									<Button type='submit' color='primary' radius='full' size='lg' isLoading={ isLoading }
													className='uppercase font-bold'>
										{ t('send') }
									</Button>
								</Form>
							</ModalBody>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default CallbackModal;
