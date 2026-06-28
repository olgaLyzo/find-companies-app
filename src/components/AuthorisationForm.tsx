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

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const loginValid = loginInput.trim().length > 2;
    const passwordValid = password.trim().length >= 7;
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
      setError('Неверный логин или пароль ❌');
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
            name="login"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
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
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
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