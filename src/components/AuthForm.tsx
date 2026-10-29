import React, { useState } from 'react';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  onAuthSuccess: (username: string) => void;
  setLoading: (loading: boolean) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess, setLoading }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onAuthSuccess(username || email);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', background: '#242424', borderRadius: '8px', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {mode === 'login' ? 'Вход в систему' : 'Регистрация на сайте группы'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#1a1a1a', color: '#fff' }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#1a1a1a', color: '#fff' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#1a1a1a', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '12px', background: '#646cff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <span
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{ color: '#646cff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
        </span>
      </p>
    </div>
  );
};
