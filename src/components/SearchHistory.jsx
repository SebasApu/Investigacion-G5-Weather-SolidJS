import { For, Show } from 'solid-js';
import { history, searchCity, weather } from '../store/weatherStore';
import '../styles/components/SearchHistory.css';

export default function SearchHistory() {
  const currentCity = () => weather()?.name?.toLowerCase();

  return (
    <Show when={history().length > 0}>
      <div class="history-container">
        <span class="history-label">Recientes</span>

        <div class="history-chips">
          <For each={history()}>
            {(city) => {
              const isActive = () => city.toLowerCase() === currentCity();

              return (
                <button
                  type="button"
                  classList={{
                    'history-chip': true,
                    'history-chip-active': isActive(),
                  }}
                  onClick={() => searchCity(city)}
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