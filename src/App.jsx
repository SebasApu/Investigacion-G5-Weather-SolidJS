import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

export default function App() {
  return (
    <div class="app">
      <h1 class="app-title">App del Clima</h1>
      <SearchBar />
      <WeatherCard />
    </div>
  );
}
