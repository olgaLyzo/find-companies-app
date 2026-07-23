import css from '../scss/components_styles/header.module.scss';
import React, { useState } from 'react';
import  BurgerMenu  from './BurgerMenu';
import Statistic  from './Statistic';
import { Link } from 'react-router-dom';
import AccountBlock from './AccountBlock';
import { useAuth } from '../context/AuthContext';



const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated, logout } = useAuth();
	const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };
	const menuItems = isAuthenticated
		? [
				{ label: 'Главная', link: '/' },
				{ label: 'Тарифы', link: '/tarifs' },
				{ label: 'FAQ', link: '/questions' },
				{ label: 'Выйти', action: logout },
			]
		: [
				{ label: 'Зарегистрироваться', link: '/auth' },
				{ label: 'Вход', link: '/login' },
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
						if (!item.link) return null;
						if (!isAuthenticated && (item.label === "Зарегистрироваться" || item.label === "Вход")) {
							return null;
						}
						return (
							<Link
								key={index}
								to={item.link}
								className={css.menuItem}
							>
								{item.label}
							</Link>
						);
					})
				}
			</div>
			{ isAuthenticated ? (
				<Statistic />
				): ''
			}
			{
				isAuthenticated ? 
					(<AccountBlock />) :
					(
						<div className={css.menu}>
							<Link to="/auth">
								<button className={css.registration_btn}>Зарегистрироваться</button>
							</Link>
							<div className={css.limiter}></div>
							<Link to="/login">
								<button className={css.enter_in_account}>Войти</button>
							</Link>
						</div>
					)
			}
    	<BurgerMenu 
				menuItems={menuItems} 
				isOpen={isOpen}
				onClick={toggleMenu}
			/>
  	</header>
)}
  
export default Header;