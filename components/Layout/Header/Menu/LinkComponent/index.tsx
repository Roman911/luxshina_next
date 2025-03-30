import { FC } from 'react';
import Image from 'next/image';
import { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';

interface Props extends LinkProps {
	img?: string
	label: string
	mt?: string
	border: boolean
}

const LinkComponent: FC<Props> = ({ href, img, label, mt, border }) => {
	return <Link
		href={ href }
		className={ twMerge('flex items-center gap-2.5 group/item', mt,
			border &&
			'w-12 lg:w-14 h-10 text-sm lg:text-base justify-center font-medium border border-gray-700 rounded-sm '
			+ 'transition hover:text-primary hover:border-primary hover:bg-blue-100'
		)}
	>
		{ img && <Image
			src={ `/icons/${img}.svg` }
			alt={ `${img} logo` }
			width={ 24 }
			height={ 24 }
			priority
		/> }
		<span className={ twMerge(!border && 'transition group-hover/item:text-primary group-hover/item:underline') }>
			{ label }
		</span>
	</Link>
};

export default LinkComponent;
