import './scss/base_styles/_font_styles.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import App from './App';
import Header from './components/Header'; 
import MainBlock from './components/MainBlock';
import Footer from './components/Footer';
import AuthorisationPage from './components/AuthorisationPage';
import PageSearching from './components/PageSearching';
import ArticlesPage from './components/ArticlesPage';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App 
				headerComponent={<Header />}
				authorisationComponent={<AuthorisationPage />}
				mainComponent={<MainBlock />}
				pageSearchingComponent={<PageSearching />}
				articlesPageComponent={<ArticlesPage />}
				footerComponent={<Footer />} 
			>
			</App>
    </StrictMode>
  );
}