'use client'
import { FC, JSX, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { Section } from '@/models/section';

interface Props {
	children: JSX.Element
	isBattery: boolean
}

const FilterBlock: FC<Props> = ({ children, isBattery }) => {
	const t = useTranslations('Main');
	const [ isParams, setIsParams ] = useState(true);
	const [ section, setSection ] = useState<Section>(Section.Tires);

	return (
		<div className={ twMerge('flex-1 py-8 px-6 rounded-2xl bg-violet-500 text-white', isBattery && 'bg-primary') }>
			<div className='flex justify-between'>
				{ isBattery ?
					<div className='text-2xl uppercase font-bold'>{ t('battery') }</div> :
					<div>
						<Button
							size='lg'
							radius='full'
							onPress={ () => setSection(Section.Tires) }
							variant={ section === Section.Tires ? 'solid' : 'bordered' }
							className={ twMerge('mr-2 text-2xl uppercase font-bold text-white', section === Section.Tires ? 'bg-white text-black' : 'opacity-50') }
						>
							{ t('tires') }
						</Button>
						<Button
							size='lg'
							radius='full'
							onPress={ () => setSection(Section.Disks) }
							variant={ section === Section.Disks ? 'solid' : 'bordered' }
							className={ twMerge('text-2xl uppercase font-bold text-white', section === Section.Disks ? 'bg-white text-black' : 'opacity-50') }
						>
							{ t('disks') }
						</Button>
					</div> }
				<div>
					<Button
						variant='light'
						onPress={ () => setIsParams(true) }
						className={ twMerge('text-white font-bold', !isParams && 'opacity-50') }
					>
						{ t('by parameters') }
					</Button>
					{ !isBattery &&
						<Button
							variant='light'
							onPress={ () => setIsParams(false) }
							className={twMerge('text-white font-bold', isParams && 'opacity-50')}
						>
							{ t('by car') }
						</Button> }
				</div>
			</div>
			{ children }
			<div className='mt-4 md:mt-10 flex justify-center'>
				{/*<Button isLoading={ isLoading } onPress={ submit } className='uppercase w-full md:w-72 hover:!opacity-100'>*/}
				{/*	{ t('choose tires') }*/}
				{/*</Button>*/}
			</div>
		</div>
	)
};

export default FilterBlock;
