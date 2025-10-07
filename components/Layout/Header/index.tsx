import { FC } from 'react';
import { SettingsProps } from '@/models/settings';
import TopLine from '@/components/Layout/Header/TopLine';
import { AliasAll } from '@/models/alias';
import { IMenu } from '@/models/menu';
import HeaderMain from '@/components/Layout/Header/HeaderMain';
import Menu from './Menu';
import Progress from '@/components/Layout/Header/Progress';

interface Props {
	alias: AliasAll
	settings: SettingsProps
	menu: IMenu[]
}

const Header: FC<Props> = ({ alias, settings, menu }) => {
	return (
		<>
			<Progress />
			<div className='header'>
				<TopLine settings={ settings } alias={ alias } />
				<HeaderMain settings={ settings } />
				<Menu menu={ menu } />
			</div>
		</>
	)
};

export default Header;
