import { validateData } from './json-validator.js';
const files = {settings:'data/settings.json', categories:'data/categories.json', services:'data/services.json', faqs:'data/faqs.json'};
export async function loadData() {
  const results = await Promise.all(Object.entries(files).map(async ([key, url]) => {
    try { const response = await fetch(url, {cache:'no-store'}); if (!response.ok) throw new Error(`${response.status} ${response.statusText}`); return [key, await response.json()]; }
    catch (err) { console.error(`[BH data] Failed to load ${url}:`, err); return [key, null]; }
  }));
  const data = Object.fromEntries(results);
  const validation = validateData(data);
  return {data, validation};
}
