import Header from './Header';
import css from '../scss/authorisation.module.scss';
import Footer from './Footer';


const AuthorisationPage: React.FC = ({
	
}) => {
	return(
		<div className={css.auth}>
			
				<h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
			
		</div>
	)

}

export default AuthorisationPage;