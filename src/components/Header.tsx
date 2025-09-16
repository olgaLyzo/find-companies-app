import css from '../scss/header.module.scss';
import React from 'react';
import  BurgerMenu  from './BurgerMenu';
import Statistic  from './Statistic';

export interface HeaderProps {
  burgerMenuComponent: React.ElementType;
	statisticComponent: React.ElementType;
}



const Header: React.FC<HeaderProps> = ({ burgerMenuComponent, statisticComponent}) => {
	const menuItems = [
    { label: 'Главная', link: '/' },
    { label: 'О нас', link: '/about' },
    { label: 'Услуги', link: '/services' },
    { label: 'Контакты', link: '/contact' },
  ];

	const statData = [
		{quantity: 10, limit: 50}
	]
	return(
		<header className={css.header}>
    	<div className={css.logo}></div>
			<Statistic statData={statData}/>
    	<BurgerMenu menuItems={menuItems} />
  	</header>
	)
}
  


export default Header;