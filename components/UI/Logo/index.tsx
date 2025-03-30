'use client'
import { FC } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';

interface Props {
	isFooter?: boolean
}

const Logo: FC<Props> = ({ isFooter }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') dispatch(setProgress(true));
	}

	return (
		<Link href='/' onClick={ handleClick } className='logo'>
			<Image
				src={ `/logo${isFooter ? '-footer' : ''}.svg` }
				alt="logo"
				width={ isFooter ? 226 : 243 }
				height={ 50 }
				priority
			/>
		</Link>
	)
};

export default Logo;
