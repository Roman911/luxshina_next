import { FC, ReactNode } from 'react';
import styles from './index.module.scss';
import * as Icons from '@/components/UI/Icons';

import { Section } from '@/models/filter';
import { twMerge } from 'tailwind-merge';

interface TabProps {
	children: ReactNode
	name: Section
	section: Section
	isOpen: boolean
	handleClick: (value: Section) => void
	label: string
}

const icons = {
	tires: Icons.TireIcon,
	disks: Icons.DiskIcon,
	car: Icons.CarFilterIcon,
	battery: Icons.CarFilterIcon,
	autoGoods: Icons.CarFilterIcon,
	services: Icons.CarFilterIcon,
};

const Tab: FC<TabProps> = ({ children, name, section, isOpen, handleClick, label }) => {
	const Icon = icons[name];

	const iconClassNames = twMerge('absolute inset-1/2 left-5 -translate-y-2/4 md:hidden',
		(section !== name || !isOpen) && 'fill-[#99CFFF]',
		(section === name && isOpen) && 'fill-white',
		(name === Section.Car && (section !== name || !isOpen)) && 'stroke-[#99CFFF]',
		(name === Section.Car && (section === name && isOpen)) && 'stroke-white'
	);

	const tabClassNames = twMerge(styles.tab, 'w-full md:w-auto md:bg-transparent rounded-2xl',
		(section !== name || !isOpen) && 'bg-blue-400',
		(section === name && isOpen) && 'bg-[#005299]',
		(name !== Section.Tires) && 'mt-2.5 md:mt-0'
	);

	const buttonClassNames = twMerge(styles.link, 'text-base xl:text-xl font-bold md:mr-1.5 xl:mr-2.5 p-5 md:p-0 w-full md:w-auto relative',
		(section === name && isOpen) && 'md:pointer-events-none',
		(section === name && isOpen) && 'text-white',
		(section === name) && 'md:text-white'
	);

	const contentClassNames = twMerge('md:hidden px-5 pb-7',
		(section !== name || !isOpen) && 'hidden',
		(section === name && isOpen) && 'block'
	);

	return (
		<div className={ tabClassNames }>
			<button onClick={ () => handleClick(name) } className={ buttonClassNames }>
				<Icon className={ iconClassNames } />
				{ label }
			</button>
			<div className={ contentClassNames }>
				{ children }
			</div>
		</div>
	);
};

export default Tab;
