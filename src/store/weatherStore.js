import { createSignal, createResource, createEffect } from 'solid-js';
import { fetchWeather } from '../services/weatherApi';

const HISTORY_KEY = 'weather_history';

const [city, setCity] = createSignal('Liberia');

// createResource observa `city` reactivamente:
// - city vacío ('') es falsy → no hace fetch
// - cuando setCity('Madrid') → fetch automático
// - weather.loading y weather.error son reactivos automáticamente
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

// Para los compañeros: historial y setHistory exportados
export const [history, setHistory] = createSignal(loadHistory());

// Persiste el historial en localStorage cada vez que cambia (reactivo)
createEffect(() => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history()));
  } catch {
  }
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