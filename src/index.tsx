import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import css from './scss/index.scss';

import App from './App';
import Header from './components/Header'; 
import BurgerMenu from './components/BurgerMenu'; 
import MainBlock from './components/MainBlock';
import Card from './components/Card';
import Statistic from './components/Statistic';
import Footer from './components/Footer';
import Slider from './components/Slider';
import AuthorisationPage from './components/AuthorisationPage';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App 
				headerComponent={<Header />} 
				authorisationComponent={<AuthorisationPage />} 
				mainComponent={<MainBlock />} 
				footerComponent={<Footer/>}>
			</App>
    </StrictMode>
  );
}