import { Show } from 'solid-js';
import { weather } from '../store/weatherStore';
import '../styles/components/WeatherCard.css';

export default function WeatherCard() {
  return (
    <div class="weather-wrapper">
      
      <Show when={weather.loading}>
        <div class="status-message loading-message">
          Buscando el clima...
        </div>
      </Show>

      <Show when={weather.error}>
        <div class="status-message error-message">
           {weather.error.message || "Error al conectar con el servidor."}
        </div>
      </Show>

      <Show when={!weather.loading && !weather.error && weather()}>
        {(data) => (
          <div class="weather-layout">
            <div class="weather-main">
              <span class="weather-country">{data().sys.country}</span>
              <h2 class="weather-city">{data().name}</h2>
              <div class="weather-temp-row">
                <img
                  class="weather-icon"
                  src={`https://openweathermap.org/img/wn/${data().weather[0].icon}@2x.png`}
                  alt={data().weather[0].description}
                />
                <span class="weather-temp">{Math.round(data().main.temp)}°</span>
              </div>
              <div class="weather-bottom">
                <span class="weather-badge">{data().weather[0].description}</span>
                <span class="weather-feels">Sensación {Math.round(data().main.feels_like)}°C</span>
              </div>
            </div>

            <div class="weather-details">
              <div class="weather-detail">
                <span class="detail-icon">💧</span>
                <span class="detail-label">HUMEDAD</span>
                <span class="detail-value">{data().main.humidity}%</span>
              </div>
              <div class="weather-detail">
                <span class="detail-icon">💨</span>
                <span class="detail-label">VIENTO</span>
                <span class="detail-value">{data().wind.speed} km/h</span>
              </div>
              <div class="weather-detail">
                <span class="detail-icon">👁️</span>
                <span class="detail-label">VISIBILIDAD</span>
                <span class="detail-value">{data().visibility ? (data().visibility / 1000) + ' km' : 'N/D'}</span>
              </div>
              <div class="weather-detail">
                <span class="detail-icon">🔴</span>
                <span class="detail-label">PRESIÓN</span>
                <span class="detail-value">{data().main.pressure} mb</span>
              </div>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}