import { FC, ReactNode } from 'react';
import { Link } from '@/i18n/routing';
import { twMerge } from 'tailwind-merge';
import { Button as MyButton } from '@heroui/react';

interface Props {
	cleaned: string
	params: string
	href: string
	handleClick: () => void
	children: ReactNode
}

const Button: FC<Props> = ({ children, cleaned, params, href, handleClick }) => {
	return (
		<MyButton
			as={ Link }
			variant='light'
			color='default'
			size='md'
			onPress={ handleClick }
			className={ twMerge('font-semibold px-2', params === cleaned && 'text-primary') }
			href={ href }
		>
			{ children }
		</MyButton>
	)
};

export default Button;
