import css from '../scss/authorisation_form.module.scss';

const AuthorisationForm: React.FC = () => {
	return(
	
				<div className={css.form_container}>
					<img className={css.lock} src='../../public/images/grey-lock.svg' alt='grey-lock'/>
					<div className={css.tabs}>
						<button className={css.active}>Войти</button>
						<button className={css.sign_in_btn}>Зарегистрироваться</button>
					</div>
					<form>
						<label>
							Логин или номер телефона:
							<input type="text" name="login" required />
						</label>
						<label>
							Пароль:
							<input type="password" name="password" required />
						</label>
						<button type="submit" className={css.login_btn}>Войти</button>
					</form>
					<a href="#" className={css.forgot_password}>Восстановить пароль</a>

					<div className={css.login_via}>
						<p>Войти через:</p>
						<div className={css.social_buttons}>
							<button className={css.google}>
								<img src='images/google_icon.svg'/>
							</button>
							<button>
								<img src='images/facebook_icon.svg'/>
							</button>
							<button>
								<img src='images/yandex_icon.svg'/>
							</button>
						</div>
					</div>
				</div>
		
	)
}

export default AuthorisationForm;