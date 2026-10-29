import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { Loader } from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px 20px', boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>🎸 Rock & Rap Band Official</h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Добро пожаловать на официальный сайт музыкальной группы!</p>
      </header>

      {user ? (
        <div style={{ textAlign: 'center', background: '#242424', padding: '30px', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
          <h2>Добро пожаловать, {user}!</h2>
          <p style={{ color: '#aaa' }}>Вы успешно вошли в закрытый раздел фанатов.</p>
          <button
            onClick={() => setUser(null)}
            style={{ marginTop: '15px', padding: '10px 20px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Выйти
          </button>
        </div>
      ) : (
        <AuthForm onAuthSuccess={(username) => setUser(username)} setLoading={setLoading} />
      )}
    </div>
  );
}

export default App;
