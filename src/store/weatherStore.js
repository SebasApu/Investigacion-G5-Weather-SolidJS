import { createSignal, createResource, createEffect } from 'solid-js';
import { fetchWeather } from '../services/weatherApi';

const HISTORY_KEY = 'weather_history';

const [city, setCity] = createSignal('Liberia');

// createResource observa `city` reactivamente y hace fetch automático
export const [weather] = createResource(city, fetchWeather);

function loadHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const [history, setHistory] = createSignal(loadHistory());

createEffect(() => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history()));
  } catch {}
});

export function searchCity(newCity) {
  const trimmed = newCity.trim();
  if (!trimmed) return;
  setCity(trimmed);
  setHistory(prev => {
    const filtered = prev.filter(c => c.toLowerCase() !== trimmed.toLowerCase());
    return [trimmed, ...filtered].slice(0, 5);
  });
}
