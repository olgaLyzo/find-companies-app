import Header from './Header';
import css from '../scss/authorisation.module.scss';
import Footer from './Footer';
import AuthorisationForm from './AuthorisationForm';


const AuthorisationPage: React.FC = () => {
	return(
		<div className={css.auth}>
			<h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
			<AuthorisationForm />
			<img className={css.people_with_key} src="images/people_with_key.svg" alt="people_with_key" />
		</div>
	)
}

export default AuthorisationPage;