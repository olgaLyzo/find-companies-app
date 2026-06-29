import { useEffect, useState } from 'react';
import css from '../scss/components_styles/authorisation_form.module.scss';
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"; 
import { loginRequest } from "../requests/authAPI";

const AuthorisationForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
	const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

	
	
	
	
	
	
	
	useEffect(() => {
  const passwordValid = password.trim().length >= 7;
  const v = loginInput.trim();
  const phoneRegex = /^\+?\d{9,15}$/;
  const loginRegex = /^[a-zA-Z0-9_]{3,}$/;
  let loginValid = false;

	if (v === '') {
  loginValid = false;
  setLoginError('');
	}
	else if (v.startsWith('+') || /^\d+$/.test(v)) {
			const normalizedPhone = v.replace(/[\s\-()]/g, '');
		loginValid = phoneRegex.test(normalizedPhone);
		setLoginError(
			loginValid 
			? '' 
			: 'Введите корректные данные'
		);
	}
	else {
		loginValid = loginRegex.test(v);

		setLoginError(
			loginValid
				? ''
				: 'Используйте только латинские буквы, цифры и "_"'
		);
	}
		setIsValid(loginValid && passwordValid);
	}, [loginInput, password]);








  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginRequest(loginInput, password);

      login(
        data.accessToken,
        data.expire,
        data.name,
        data.surname,
        data.avatarUrl
      );

      navigate('/');
    } catch {
			console.log("LOGIN ERROR:", error);
      setError('Неверный пароль или логин');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={css.form_container}>
      <img className={css.lock_icon} src='images/grey-lock.svg' alt='grey-lock'/>
      <div className={css.tabs}>
        <button className={css.active}>Войти</button>
        <button className={css.sign_in_btn}>Зарегистрироваться</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Логин или номер телефона:
          <input
            type="text"
						name="username"
            value={loginInput}
						onChange={(e) => {
							setLoginInput(e.target.value);
							setError('');
						}}
						className={`${loginError ? css.input_error : ''}`}
						required
          />
        </label>

				{loginError && <p className={css.error_text}>{loginError}</p>}

        <label>
          Пароль:
					<input
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setError('');
						}}
						className={`${error ? css.input_error : ''}`}
					/>
        </label>
					
				{error && <p className={css.error_text}>{error}</p>}
				
        <button 
          type="submit"
          className={`${css.login_btn} ${isValid ? css.active : ''}`}
          disabled={!isValid || loading}
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>
      <a href="#" className={css.forgot_password}>Восстановить пароль</a>
      <div className={css.login_via}>
        <p>Войти через:</p>
        <div className={css.social_buttons}>
          <button className={css.google}><img src='images/google_icon.svg'/></button>
          <button><img src='images/facebook_icon.svg'/></button>
          <button><img src='images/yandex_icon.svg'/></button>
        </div>
      </div>
    </div>
  );
};

export default AuthorisationForm;