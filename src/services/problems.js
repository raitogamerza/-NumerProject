const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000';

export async function getProblemsByMethod(method) {
  const url = `${BASE_URL}/api/problems${method ? `?method=${encodeURIComponent(method)}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch problems (${res.status})`);
  }
  return res.json(); // array of problems
}

export async function getRandomProblem(method) {
  const problems = await getProblemsByMethod(method);
  if (!Array.isArray(problems) || problems.length === 0) {
    throw new Error(`No problems found${method ? ` for method ${method}` : ''}`);
  }
  const idx = Math.floor(Math.random() * problems.length);
  return problems[idx];
}
