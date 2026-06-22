const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const TIMEOUT_MS = 8000;

export async function fetchWeather(city) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (res.status === 401) throw new Error('Tu API Key es inválida o aún se está activando (espera 15-30 mins).');

    const data = await res.json();

    // OWM devuelve HTTP 200 con cod:"404" en el JSON cuando la ciudad no existe
    if (String(data.cod) === '404') throw new Error('La ciudad ingresada no existe.');
    if (!res.ok) throw new Error('Error al obtener datos del clima.');

    return data;
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError' || error?.name === 'TypeError' || error?.message?.includes('Failed to fetch')) {
      throw new Error('Fallo de red: Verifica tu conexión a internet.');
    }
    throw error;
  }
}
