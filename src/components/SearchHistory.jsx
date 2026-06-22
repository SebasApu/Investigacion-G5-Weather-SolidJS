import { For, Show } from 'solid-js';
import { history, searchCity, weather } from '../store/weatherStore';
import '../styles/components/SearchHistory.css';

export default function SearchHistory() {
  // Obtiene el nombre de la ciudad actualmente mostrada para resaltar el chip activo
  const currentCity = () => weather()?.name?.toLowerCase();

  return (
    // Show oculta todo el bloque cuando no hay historial — evita mostrar una sección vacía
    <Show when={history().length > 0}>
      <div class="history-container">
        <span class="history-label">Recientes</span>

        <div class="history-chips">
          {/* For renderiza un botón por cada ciudad del historial de forma reactiva */}
          <For each={history()}>
            {(city) => {
              // isActive es una función reactiva — se recalcula cuando weather() cambia
              const isActive = () => city.toLowerCase() === currentCity();

              return (
                <button
                  type="button"
                  classList={{
                    'history-chip': true,
                    'history-chip-active': isActive() // Resalta la ciudad que se está mostrando
                  }}
                  onClick={() => searchCity(city)} // Al hacer clic vuelve a buscar esa ciudad
                >
                  {city}
                </button>
              );
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}
