import { FC } from 'react';
import s from './Header.module.css';

const Header: FC = () => {
	return (
		<header className={s.header}>
			<h2 className={s.header__title}>JWT Full Auth</h2>
		</header>
	);
};

export default Header;
