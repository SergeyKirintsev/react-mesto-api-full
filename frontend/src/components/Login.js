import LoginForm from './LoginForm';

function Login({ onLogin }) {
  return <LoginForm title="Вход" submitBtnText="Войти" onSubmit={onLogin} />;
}

export default Login;
