const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeather(city) {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
    );
    
    if (!res.ok) {
      if (res.status === 404) throw new Error('La ciudad ingresada no existe.');
      if (res.status === 401) throw new Error('Tu API Key es inválida o aún se está activando (espera 15-30 mins).');
      throw new Error('Error al obtener datos del clima');
    }
    
    return await res.json();
  } catch (error) {
    // Detectamos si es un fallo de red (sin internet)
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      throw new Error('Fallo de red: Verifica tu conexión a internet.');
    }
    throw error;
  }
}