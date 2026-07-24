import css from '../scss/components_styles/burger.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export interface BurgerProps {
  menuItems: {
    label: string;
    link?: string;
    action?: () => void;
  }[];
  isOpen: boolean;
  onClick: () => void;
}

const BurgerMenu: React.FC<BurgerProps> = ({ menuItems, onClick, isOpen }) => {
  return (
    <div className={css.hamburgerMenu}>
      <button className={css.hamburgerButton} onClick={onClick}>
        <div className={`${css.bar} ${isOpen ? css.open1 : ''}`}></div>
        <div className={`${css.bar} ${isOpen ? css.open2 : ''}`}></div>
        <div className={`${css.bar} ${isOpen ? css.open3 : ''}`}></div>
      </button>
      <nav className={`${css.menu} ${isOpen ? css.open : ''}`}>
        {menuItems.map((item, index) =>
          item.action ? (
            <button
              key={index}
              className={css.menuItem}
              onClick={() => {
                item.action?.();
                onClick();
              }}
            >
              {item.label}
            </button>
          ) : (
            <Link key={index} to={item.link!} className={css.menuItem} onClick={onClick}>
              {item.label}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default BurgerMenu;
