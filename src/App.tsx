import React, { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { AdBoard } from './components/AdBoard';
import { Loader } from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '20px', boxSizing: 'border-box' }}>
      {!token ? (
        <AuthForm onAuthSuccess={handleLoginSuccess} setLoading={setLoading} />
      ) : (
        <AdBoard token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;