import { Switch, Match } from "solid-js";
import { Sun, Moon, Thermometer, Flame, Snowflake, Droplets, Wind, Eye, Gauge } from "lucide-solid";
import { weather } from "../store/weatherStore";
import "../styles/components/WeatherCard.css";

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

const formatTime = (timestamp) => {
  if (!timestamp) return "N/D";
  return new Date(timestamp * 1000).toLocaleTimeString("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function WeatherCard() {
  return (
    <div class="weather-wrapper">
      <Switch>

        <Match when={weather.loading}>
          <div class="status-message loading-message">
            <div class="spinner" />
          </div>
        </Match>

        <Match when={weather.error}>
          <div class="status-message error-message">
            ⚠️ {weather.error?.message || "Fallo de red: Verifica tu conexión a internet."}
          </div>
        </Match>

        <Match when={weather()} keyed>
          {(data) => {
            const description = capitalize(data.weather[0].description);

            return (
              <div class="weather-layout">
                <section class="weather-hero">
                  <div class="weather-hero-info">
                    <span class="weather-location">{data.sys.country}</span>

                    <h2 class="weather-city">{data.name}</h2>

                    <div class="weather-temp-block">
                      <span class="weather-temp">
                        {Math.round(data.main.temp)}
                      </span>
                      <span class="weather-temp-unit">°C</span>
                    </div>

                    <div class="weather-meta">
                      <span class="weather-badge">{description}</span>
                      <span class="weather-feels">
                        Sensación {Math.round(data.main.feels_like)}°C
                      </span>
                    </div>
                  </div>

                  <div class="weather-hero-icon">
                    <img
                      class="weather-icon"
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                      alt={description}
                    />
                    <span class="weather-icon-label">{description}</span>
                  </div>
                </section>

                <section class="weather-secondary">
                  <article class="secondary-card">
                    <h2 class="details-title">
                      <Sun size={16} />
                      Información solar
                    </h2>
                    <div class="secondary-item">
                      <Sun size={18} />
                      <div>
                        <span>Amanecer</span>
                        <strong>{formatTime(data.sys.sunrise)}</strong>
                      </div>
                    </div>
                    <div class="secondary-item">
                      <Moon size={18} />
                      <div>
                        <span>Atardecer</span>
                        <strong>{formatTime(data.sys.sunset)}</strong>
                      </div>
                    </div>
                  </article>

                  <article class="secondary-card">
                    <h2 class="details-title">
                      <Thermometer size={16} />
                      Temperatura
                    </h2>
                    <div class="secondary-item">
                      <Thermometer size={18} />
                      <div>
                        <span>Sensación térmica</span>
                        <strong>{Math.round(data.main.feels_like)}°</strong>
                      </div>
                    </div>
                    <div class="secondary-item">
                      <Flame size={18} />
                      <div>
                        <span>Máxima</span>
                        <strong>{Math.round(data.main.temp_max)}°</strong>
                      </div>
                    </div>
                    <div class="secondary-item">
                      <Snowflake size={18} />
                      <div>
                        <span>Mínima</span>
                        <strong>{Math.round(data.main.temp_min)}°</strong>
                      </div>
                    </div>
                  </article>
                </section>

                <section class="weather-details">
                  <article class="weather-detail">
                    <span class="detail-icon"><Droplets size={20} /></span>
                    <span class="detail-label">Humedad</span>
                    <span class="detail-value">{data.main.humidity}%</span>
                    <span class="detail-unit">{getHumidityText(data.main.humidity)}</span>
                  </article>
                  <article class="weather-detail">
                    <span class="detail-icon"><Wind size={20} /></span>
                    <span class="detail-label">Viento</span>
                    <span class="detail-value">{formatWind(data.wind.speed)}</span>
                    <span class="detail-unit">km/h</span>
                  </article>
                  <article class="weather-detail">
                    <span class="detail-icon"><Eye size={20} /></span>
                    <span class="detail-label">Visibilidad</span>
                    <span class="detail-value">{formatVisibility(data.visibility)}</span>
                    <span class="detail-unit">km</span>
                  </article>
                  <article class="weather-detail">
                    <span class="detail-icon"><Gauge size={20} /></span>
                    <span class="detail-label">Presión</span>
                    <span class="detail-value">{data.main.pressure}</span>
                    <span class="detail-unit">mb</span>
                  </article>
                </section>
              </div>
            );
          }}
        </Match>

      </Switch>
    </div>
  );
}
