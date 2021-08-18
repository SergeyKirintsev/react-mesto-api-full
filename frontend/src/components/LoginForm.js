import { useState } from 'react';

function LoginForm({ title, submitBtnText, onSubmit, children, comp }) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
  };

  return (
    <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
      <h2 className="login-form__title">{title}</h2>
      <section className="login-form__section">
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          className="login-form__input"
          value={inputValues.email || ''}
          placeholder="Email"
          required
          aria-label="Поле для ввода почты"
        />
      </section>
      <section className="login-form__section">
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          className="login-form__input"
          value={inputValues.password || ''}
          placeholder="Пароль"
          required
          minLength="5"
          aria-label="Поле для ввода пароля"
        />
      </section>
      {comp}
      <button type="submit" className="login-form__submit btn-hover">
        {submitBtnText}
      </button>

      <p className="login-form__wrap-link">{children}</p>
    </form>
  );
}

export default LoginForm;
