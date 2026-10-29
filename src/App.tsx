import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { Loader } from './components/Loader';
import { api } from './api';

interface Ad {
  id: string;
  title: string;
  description: string;
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  
  const [ads, setAds] = useState<Ad[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      api.getAds()
        .then((data) => setAds(data))
        .catch((err) => setError(err.message));
    }
  }, [token]);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setLoading(true);
      const newAd = await api.createAd({ title, description }, token);
      setAds([newAd, ...ads]);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px 20px', boxSizing: 'border-box' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>🎸 Rock & Rap Band Official</h1>
        <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Доска объявлений музыкальной группы</p>
      </header>

      {!token ? (
        <AuthForm onAuthSuccess={handleLoginSuccess} setLoading={setLoading} />
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#242424', padding: '15px 20px', borderRadius: '8px' }}>
            <span>Вы вошли в систему</span>
            <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Выйти
            </button>
          </div>

          {error && <p style={{ color: '#ff4444' }}>Ошибка: {error}</p>}

          <form onSubmit={handleCreateAd} style={{ background: '#242424', padding: '20px', borderRadius: '8px', marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>Создать объявление</h3>
            <input
              type="text"
              placeholder="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#1a1a1a', color: '#fff' }}
            />
            <textarea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #555', background: '#1a1a1a', color: '#fff', minHeight: '80px' }}
            />
            <button type="submit" style={{ padding: '12px', background: '#646cff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Опубликовать
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {ads.length === 0 ? (
              <p style={{ color: '#aaa', textAlign: 'center' }}>Пока нет объявлений...</p>
            ) : (
              ads.map((ad) => (
                <div key={ad.id} style={{ background: '#242424', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                  <h3 style={{ margin: '0 0 8px 0' }}>{ad.title}</h3>
                  <p style={{ margin: '0', color: '#ccc', lineHeight: '1.4' }}>{ad.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
