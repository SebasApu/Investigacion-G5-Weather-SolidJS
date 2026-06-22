import { createSignal, createResource, createEffect } from 'solid-js';
import { fetchWeather } from '../services/weatherApi';

const HISTORY_KEY = 'weather_history';

// createSignal crea una variable reactiva — cuando cambia, todo lo que la usa se actualiza solo
// city es PRIVADO: los componentes no pueden cambiarlo directamente, solo a través de searchCity()
const [city, setCity] = createSignal('Liberia');

// createResource observa la señal `city` — cada vez que city cambia, llama fetchWeather automáticamente
// Expone tres propiedades reactivas: weather() (datos), weather.loading (cargando), weather.error (error)
export const [weather] = createResource(city, fetchWeather);

// Carga el historial guardado en localStorage al iniciar la app
function loadHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return []; // Si localStorage no está disponible, empieza con lista vacía
  }
}

export const [history, setHistory] = createSignal(loadHistory());

// createEffect se ejecuta automáticamente cada vez que history() cambia
// Mantiene el localStorage siempre sincronizado con el historial en memoria
createEffect(() => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history()));
  } catch {}
});

// Función pública para buscar una ciudad — es el único punto de entrada para cambiar la ciudad
export function searchCity(newCity) {
  const trimmed = newCity.trim();
  if (!trimmed) return;

  setCity(trimmed); // Cambia la señal → createResource detecta el cambio y hace el fetch

  // Actualiza el historial: elimina la ciudad si ya existía y la agrega al inicio, máximo 5
  setHistory(prev => {
    const filtered = prev.filter(c => c.toLowerCase() !== trimmed.toLowerCase());
    return [trimmed, ...filtered].slice(0, 5);
  });
}
