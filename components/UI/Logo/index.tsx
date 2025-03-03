import { FC } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface Props {
	isFooter?: boolean
}

const Logo: FC<Props> = ({ isFooter }) => {
	return (
		<Link href='/' className='logo'>
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
