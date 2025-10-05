import css from '../scss/header.module.scss';
import React, { useState } from 'react';
import  BurgerMenu  from './BurgerMenu';
import Statistic  from './Statistic';
import { Link } from 'react-router';


const Header: React.FC = ({ 
	
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const statData = [
		{quantity: 10, limit: 50}
	]

	const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

	const menuItems = [
		{ label: 'Зарегистрироваться', link: '/auth'},
		{ label: 'Вход', link: '/login'},
    { label: 'Главная', link: '/' },
    { label: 'Тарифы', link: '/tarifs' },
    { label: 'FAQ', link: '/questions' },
  ];

	return(
		<header className={css.header}>
    	<div className={css.logo}></div>
			<div className={css.menu_items}>
				{ 
					menuItems.map((item, index) => {
						if(index !== 0 && index !== 1){
							return (
								<Link
									key={index} 
									to={item.link} 
									className={css.menuItem} 
									onClick={toggleMenu}
								>
									{item.label}
								</Link>
							)
						}
					})
				}
			</div>
			<Statistic statData={statData}/>
			<div className={css.menu}>
				<Link to="/auth">
					<button className={css.registration_btn}>Зарегистрироваться</button>
				</Link>
				<div className={css.limiter}></div>
				<Link to="/login">
					<button className={css.enter_in_account}>Войти</button>
				</Link>
			</div>
			
    	<BurgerMenu 
				menuItems={menuItems} 
				isOpen={isOpen}
				onClick={toggleMenu}
			/>
  	</header>
	
)}
  


export default Header;