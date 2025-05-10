import { FC } from 'react';
import { useTranslations } from 'next-intl';
import DOMPurify from 'isomorphic-dompurify';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { SettingsProps } from '@/models/settings';
import { Language, LanguageCode } from '@/models/language';

interface Props {
	locale: Language
	settings: SettingsProps
}

const OnlineInstallment: FC<Props> = ({ locale, settings }) => {
	const t = useTranslations('OnlineInstallment');
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: ['iframe'],
			ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy']
		});
		return (
			<div
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<>
			<Button
				size='lg'
				radius='full'
				onPress={ onOpen }
				color='success'
				className='w-full md:w-72 hover:shadow uppercase font-bold text-white'
			>
				{ t('installment plan') }
			</Button>
			<Modal size='5xl' isOpen={ isOpen } scrollBehavior='inside' onOpenChange={ onOpenChange }>
				<ModalContent>
					{ (onClose) => (
						<>
							<ModalHeader>
								<h3 className="text-base font-semibold uppercase leading-6 text-gray-900">
									{ t('installment plan') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<HtmlContent htmlString={ settings[lang].kredit } />
							</ModalBody>
							<ModalFooter>
								<Button onPress={ onClose } color='primary' radius='full' size='lg' className='w-max px-5 uppercase font-bold'>
									{ t('close') }
								</Button>
							</ModalFooter>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default OnlineInstallment;
