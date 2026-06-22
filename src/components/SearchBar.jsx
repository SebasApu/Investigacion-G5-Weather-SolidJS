import { createSignal } from 'solid-js';
import { searchCity } from '../store/weatherStore';
import '../styles/components/SearchBar.css';

export default function SearchBar() {
  const [input, setInput] = createSignal('');

  const handleSearch = () => {
    if (input().trim()) searchCity(input());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div class="search-bar">
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        class="search-input"
      />
      <button onClick={handleSearch} class="search-button">
        Buscar
      </button>
    </div>
  );
}
