'use client'
import { useRouter } from 'next/navigation';
import { FC, FormEvent } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure, } from '@heroui/modal';
import { Language } from '@/models/language';
import { useTranslations } from 'next-intl';
import { Section } from '@/models/filter';
import { Offers } from '@/models/product';
import { baseDataAPI } from '@/services/baseDataService';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';
import { onOrderBuy1click } from '@/event';

interface Props {
	locale: Language
	offerId: number
	quantity: number
	section: Section
	model: string | undefined
	brand: string | undefined
	fullName: string | undefined
	offerItem: Offers | undefined
}

const QuickOrder: FC<Props> = (
	{
		locale,
		offerId,
		quantity,
		offerItem,
		brand,
		model,
		fullName,
		section
	}
) => {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ createOrder, { isLoading } ] = baseDataAPI.useCreateOrderMutation();
	const t = useTranslations('QuickOrder');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;

		const product = {
			product_id: offerItem?.product_id,
			offer_id: offerId,
			price: Number(offerItem?.price),
			quantity,
		};

		await createOrder({
			fast: 1,
			firstname: '',
			lastname: '',
			surname: '',
			email: '',
			telephone: formatPhoneNumber(phone),
			total: Number(offerItem?.price) * quantity,
			comment: 'null',
			payment_method: 1,
			shipping_method: 1,
			payment_address_1: 'null',
			payment_address_2: 'null',
			payment_city: '',
			ref_wirehouse: '',
			ref_city: '',
			products: [ product ],
		}).then((response: {
			data?: { result: boolean, linkpay: string, order_id: number };
			error?: FetchBaseQueryError | SerializedError
		}) => {
			const data = response?.data;
			if(data) {
				if(data?.linkpay?.length > 0) {
					window.open(data?.linkpay, "_blank")
				}
				if(data?.result) {
					onOrderBuy1click(offerItem, fullName, brand, section, model, quantity, data?.order_id);
					event.currentTarget.reset(); // Reset form fields
					router.push(`/${ locale }/order/successful`)
				}
			} else if(response.error) {
				console.error('An error occurred:', response.error);
			}
		});
	}

	return (
		<>
			<Button
				size='lg'
				radius='full'
				onPress={ onOpen }
				className='bg-white w-full md:w-72 hover:bg-white hover:shadow uppercase font-bold'
			>
				{ t('quick order') }
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader>
								<h3 className="text-base font-semibold uppercase leading-6 text-gray-900">
									{ t('quick order') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<p className="text-sm text-gray-500">
									{ t('quick order text') }
								</p>
								<Form
									className='mt-2 mb-8 flex flex-col gap-4'
									onSubmit={ onSubmit }
								>
									<PhoneMaskInput/>
									<Button type='submit' color='primary' radius='full' size='lg' className='uppercase ml-auto mt-2 font-bold'
													isLoading={ isLoading }>
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

export default QuickOrder;
