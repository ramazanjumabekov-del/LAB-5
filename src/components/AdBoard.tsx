import React, { useEffect, useState } from 'react';
import { api } from '../api';

interface Ad {
  id: string;
  title: string;
  description: string;
}

export const AdBoard: React.FC<{ token: string; onLogout: () => void }> = ({ token, onLogout }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getAds()
      .then((data) => setAds(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAd = await api.createAd({ title, description }, token);
      setAds([newAd, ...ads]);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Доска объявлений</h2>
        <button onClick={onLogout} style={{ padding: '8px 15px', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Выйти
        </button>
      </div>

      {error && <p style={{ color: '#ff4444' }}>Ошибка: {error}</p>}

      <form onSubmit={handleCreateAd} style={{ background: '#242424', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3>Создать объявление</h3>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#1a1a1a', color: '#fff' }}
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#1a1a1a', color: '#fff', minHeight: '80px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#646cff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Опубликовать
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {ads.length === 0 ? (
          <p style={{ color: '#aaa' }}>Пока нет объявлений...</p>
        ) : (
          ads.map((ad) => (
            <div key={ad.id} style={{ background: '#242424', padding: '15px', borderRadius: '8px', border: '1px solid #444' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{ad.title}</h3>
              <p style={{ margin: '0', color: '#ccc' }}>{ad.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};