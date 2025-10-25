import axios from 'axios';

const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export async function getProblemsByMethod(method) {
  const res = await api.get('/api/problems', {
    params: method ? { method } : undefined,
  });
  const data = res.data;
  if (!Array.isArray(data)) {
    throw new Error('Unexpected response shape');
  }
  return data;
}

export async function getRandomProblem(method) {
  const problems = await getProblemsByMethod(method);
  if (!Array.isArray(problems) || problems.length === 0) {
    throw new Error(`No problems found${method ? ` for method ${method}` : ''}`);
  }
  const idx = Math.floor(Math.random() * problems.length);
  return problems[idx];
}

