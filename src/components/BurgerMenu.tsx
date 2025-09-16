import css from '../scss/burger.module.scss';
import React, { useState } from 'react';

export interface BurgerProps {
  menuItems: { 
		label: string; 
		link: string 
	}[];
}



const BurgerMenu: React.FC<BurgerProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.hamburgerMenu}>
      <button className={css.hamburgerButton} onClick={toggleMenu}>
        <div className={`${css.bar} ${isOpen ? css.open1 : ''}`}></div>
        <div className={`${css.bar} ${isOpen ? css.open2 : ''}`}></div>
        <div className={`${css.bar} ${isOpen ? css.open3 : ''}`}></div>
      </button>
      <nav className={`${css.menu} ${isOpen ? css.open : ''}`}>
        {menuItems.map((item, index) => (
          <a key={index} href={item.link} className={css.menuItem} onClick={toggleMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default BurgerMenu;