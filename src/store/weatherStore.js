import { createSignal, createResource } from 'solid-js';
import { fetchWeather } from '../services/weatherApi';

const [city, setCity] = createSignal('Liberia');

// createResource observa `city` reactivamente:
// - city vacío ('') es falsy → no hace fetch
// - cuando setCity('Madrid') → fetch automático
// - weather.loading y weather.error son reactivos automáticamente
export const [weather] = createResource(city, fetchWeather);

// Para los compañeros: historial (Kristin) y setHistory exportados
export const [history, setHistory] = createSignal([]);

export function searchCity(newCity) {
  if (newCity.trim()) setCity(newCity.trim());
}
