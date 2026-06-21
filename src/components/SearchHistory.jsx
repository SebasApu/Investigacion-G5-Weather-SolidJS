import { For, Show } from 'solid-js';
import { history, searchCity } from '../store/weatherStore';
import '../styles/components/SearchHistory.css';

export default function SearchHistory() {
  return (
    <Show when={history().length > 0}>
      <div class="history-container">
        <span class="history-label">Recientes</span>
        <div class="history-chips">
          <For each={history()}>
            {(city) => (
              <button class="history-chip" onClick={() => searchCity(city)}>
                {city}
              </button>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
}
