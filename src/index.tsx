import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import css from './scss/index.scss';

import App from './App';
import Header from './components/Header'; 
import BurgerMenu from './components/BurgerMenu'; 
import MainBlock from './components/MainBlock';
import Card from './components/Card';
import Statistic from './components/Statistic';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App 
				headerComponent = {
					<Header 
						burgerMenuComponent={BurgerMenu} 
						statisticComponent={Statistic} 
					/>
				} 
				mainComponent={
					<MainBlock 
						сardComponent={Card}
						imageComponent={Image}
						
					/>
				}
			/>
    </StrictMode>
  );
}