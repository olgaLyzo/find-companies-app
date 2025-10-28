import { useEffect, useState } from 'react';
import css from '../scss/authorisation_form.module.scss';
import { Link, useNavigate } from 'react-router';

export const API = 'https://gateway.scan-interfax.ru';
export interface LoginResponse {
  accessToken: string;
  expire: string;
}

const AuthorisationForm: React.FC = () => {

	const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
	const [isValid, setIsValid] = useState(false);

	const navigate = useNavigate();

	const phoneRegex = /^\+\d[\d\s()-]{7,14}\d$/;	
	const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
	const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;


	useEffect(() => {
    const loginTrimmed = login.trim();
    const passwordTrimmed = password.trim();

    const loginValid =
      emailRegex.test(loginTrimmed) ||
      phoneRegex.test(loginTrimmed) ||
      usernameRegex.test(loginTrimmed);

    const passwordValid = passwordTrimmed.length >= 7;

    setIsValid(loginValid && passwordValid);
  }, [login, password]);
	

	const formatPhoneNumber = (value: string) => {
		// удаляем все символы кроме цифр и +
		let digits = value.replace(/[^\d+]/g, '');

		// если есть +7 (Россия)
		if (digits.startsWith('+7')) {
			digits = digits.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
		}
		// если +48 (Польша)
		else if (digits.startsWith('+48')) {
			digits = digits.replace(/^(\+48)(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
		}
		// если +375 (Беларусь)
		else if (digits.startsWith('+375')) {
			digits = digits.replace(
				/^(\+375)(\d{2})(\d{3})(\d{2})(\d{2})$/,
				'$1 $2 $3 $4 $5'
			);
		}
		return digits;
	};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/v1/account/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const data: LoginResponse = await response.json();
			console.log(2, data)

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('tokenExpire', data.expire);
      navigate('/');
    } catch (err) {
      setError('Неверный логин или пароль ❌');
      console.error(err);
    } finally {
			
      setLoading(false);
    }
  };

	return(
	
				<div className={css.form_container} >
					<img 
						className={css.lock} 
						src='../../public/images/grey-lock.svg' 
						alt='grey-lock'
					/>
					<div className={css.tabs}>
						<button className={css.active}>Войти</button>
						<button className={css.sign_in_btn}>Зарегистрироваться</button>
					</div>
					<form onSubmit={handleSubmit}>
						<label>
							Логин или номер телефона:
							<input 
								type="text" 
								name="login" 
								value={login}
								onChange={(e) => {
									const rawValue = e.target.value;
									if (rawValue.startsWith('+')) {
										setLogin(formatPhoneNumber(rawValue));
									} else {
										setLogin(rawValue);
									}
								}}
								required 
							/>
						</label>
						<label>
							Пароль:
							<input 
								type="password" 
								name="password" 
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required 
							/>
						</label>
							<button 
								type="submit" 
								className={`${css.login_btn} ${isValid ? css.active : ''}`}
								disabled={!isValid || loading}
								
							>{loading ? 'Входим...' : 'Войти'}
						</button>
						{error && <p style={{ color: 'red' }}>{error}</p>}
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