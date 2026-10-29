const API_BASE = 'https://inai-col2.fishrungames.com/api';

async function request(endpoint: string, method: string = 'GET', data?: any, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Ошибка при запросе к серверу');
  }

  return response.json().catch(() => ({}));
}

export const api = {
  register: (userData: any) => request('/auth/register', 'POST', userData),
  login: (credentials: any) => request('/auth/login', 'POST', credentials),
  getProfile: (token: string) => request('/profile', 'GET', undefined, token),
  getAds: () => request('/ads', 'GET'),
  createAd: (adData: any, token: string) => request('/ads', 'POST', adData, token),
};