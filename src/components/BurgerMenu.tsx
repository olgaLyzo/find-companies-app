import css from '../scss/burger.module.scss';
import React from 'react';

export interface BurgerProps {
  menuItems: { 
		label: string; 
		link: string 
	}[],
	isOpen: boolean,
	onClick: () => void,
}

const BurgerMenu: React.FC<BurgerProps> = ({ 
	menuItems, 
	onClick, 
	isOpen,
 }) => {
  return (
    <div className={css.hamburgerMenu}>
      <button className={css.hamburgerButton} onClick={onClick}>
        <div className={`${css.bar} ${isOpen ? css.open1 : ''}`}></div>
        <div className={`${css.bar} ${isOpen ? css.open2 : ''}`}></div>
        <div className={`${css.bar} ${isOpen ? css.open3 : ''}`}></div>
      </button>
      <nav className={`${css.menu} ${isOpen ? css.open : ''}`}>
        {menuItems.map((item, index) => (
          <a 
						key={index} 
						href={item.link} 
						className={css.menuItem} 
						onClick={onClick}
					>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default BurgerMenu;