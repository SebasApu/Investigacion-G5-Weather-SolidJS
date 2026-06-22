const API_KEY = import.meta.env.VITE_API_KEY; // La API Key se lee del archivo .env, nunca se escribe directo en el código
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const TIMEOUT_MS = 8000; // Si el servidor no responde en 8 segundos, cancelamos la solicitud

export async function fetchWeather(city) {
  // AbortController permite cancelar el fetch si tarda demasiado
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`,
      { signal: controller.signal } // Conectamos el controlador al fetch para poder cancelarlo
    );
    clearTimeout(timeout); // Si llegó respuesta a tiempo, cancelamos el temporizador

    if (res.status === 401) throw new Error('Tu API Key es inválida o aún se está activando (espera 15-30 mins).');

    const data = await res.json();

    // IMPORTANTE: OpenWeatherMap devuelve HTTP 200 (éxito) incluso cuando la ciudad no existe.
    // El error viene dentro del JSON con cod:"404", por eso hay que chequearlo manualmente.
    if (String(data.cod) === '404') throw new Error('La ciudad ingresada no existe.');
    if (!res.ok) throw new Error('Error al obtener datos del clima.');

    return data; // Retorna el objeto con toda la información del clima
  } catch (error) {
    clearTimeout(timeout);

    // AbortError ocurre cuando el fetch se cancela por timeout (sin internet lento)
    // TypeError ocurre cuando no hay conexión a internet en absoluto
    if (error.name === 'AbortError' || error?.name === 'TypeError' || error?.message?.includes('Failed to fetch')) {
      throw new Error('Fallo de red: Verifica tu conexión a internet.');
    }

    throw error; // Re-lanza errores propios (ciudad no encontrada, API Key inválida, etc.)
  }
}
