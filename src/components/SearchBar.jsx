import { createSignal } from 'solid-js';
import { searchCity } from '../store/weatherStore';
import '../styles/components/SearchBar.css';

export default function SearchBar() {
  // Estado local del input — solo este componente lo necesita, no va al store
  const [input, setInput] = createSignal('');

  const handleSearch = () => {
    if (input().trim()) searchCity(input()); // Solo busca si el input no está vacío
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(); // Permite buscar presionando Enter
  };

  return (
    <div class="search-bar">
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={input()}
        onInput={(e) => setInput(e.currentTarget.value)} // onInput (no onChange) actualiza en cada tecla
        onKeyDown={handleKeyDown}
        class="search-input"
      />
      <button onClick={handleSearch} class="search-button">
        Buscar
      </button>
    </div>
  );
}
