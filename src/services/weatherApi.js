const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`
  );
  if (!res.ok) {
    if (res.status === 404) throw new Error('Ciudad no encontrada');
    throw new Error('Error al obtener datos del clima');
  }
  return res.json();
}
