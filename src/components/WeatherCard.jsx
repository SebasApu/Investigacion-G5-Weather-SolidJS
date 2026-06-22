import { Show } from "solid-js";
import { weather } from "../store/weatherStore";
import "../styles/components/WeatherCard.css";

export default function WeatherCard() {
  const capitalize = (text) => {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const formatWind = (speed) => {
    if (speed === undefined || speed === null) return "N/D";

    return Number(speed).toFixed(1);
  };

  const formatVisibility = (visibility) => {
    if (!visibility) return "N/D";

    return Math.round(visibility / 1000);
  };

  const getHumidityText = (humidity) => {
    if (humidity >= 80) return "Muy alta";
    if (humidity >= 60) return "Alta";
    if (humidity >= 35) return "Normal";

    return "Baja";
  };

  return (
    <div class="weather-wrapper">
      <Show when={weather.loading}>
        <div class="status-message loading-message">
          <div class="spinner" />
        </div>
      </Show>

      <Show when={weather.error}>
        <div class="status-message error-message">
          {weather.error.message || "Error al conectar con el servidor."}
        </div>
      </Show>

      <Show when={!weather.loading && !weather.error && weather()}>
        {(data) => {
          const description = () => capitalize(data().weather[0].description);

          return (
            <div class="weather-layout">
              <section class="weather-hero">
                <div class="weather-hero-info">
                  <span class="weather-location">{data().sys.country}</span>

                  <h2 class="weather-city">{data().name}</h2>

                  <div class="weather-temp-block">
                    <span class="weather-temp">
                      {Math.round(data().main.temp)}
                    </span>
                    <span class="weather-temp-unit">°C</span>
                  </div>

                  <div class="weather-meta">
                    <span class="weather-badge">{description()}</span>
                    <span class="weather-feels">
                      Sensación {Math.round(data().main.feels_like)}°C
                    </span>
                  </div>
                </div>

                <div class="weather-hero-icon">
                  <img
                    class="weather-icon"
                    src={`https://openweathermap.org/img/wn/${
                      data().weather[0].icon
                    }@4x.png`}
                    alt={description()}
                  />

                  <span class="weather-icon-label">{description()}</span>
                </div>
              </section>

              <section class="weather-details">
                <article class="weather-detail">
                  <span class="detail-icon">
                    <i class="fa-solid fa-droplet"></i>
                  </span>
                  <span class="detail-label">Humedad</span>
                  <span class="detail-value">{data().main.humidity}%</span>
                  <span class="detail-unit">
                    {getHumidityText(data().main.humidity)}
                  </span>
                </article>

                <article class="weather-detail">
                  <span class="detail-icon">
                    <i class="fa-solid fa-wind"></i>
                  </span>
                  <span class="detail-label">Viento</span>
                  <span class="detail-value">
                    {formatWind(data().wind.speed)}
                  </span>
                  <span class="detail-unit">km/h</span>
                </article>

                <article class="weather-detail">
                  <span class="detail-icon">
                    <i class="fa-solid fa-eye"></i>
                  </span>
                  <span class="detail-label">Visibilidad</span>
                  <span class="detail-value">
                    {formatVisibility(data().visibility)}
                  </span>
                  <span class="detail-unit">km</span>
                </article>

                <article class="weather-detail">
                  <span class="detail-icon">
                    <i class="fa-solid fa-gauge-high"></i>
                  </span>
                  <span class="detail-label">Presión</span>
                  <span class="detail-value">{data().main.pressure}</span>
                  <span class="detail-unit">mb</span>
                </article>
              </section>
            </div>
          );
        }}
      </Show>
    </div>
  );
}
