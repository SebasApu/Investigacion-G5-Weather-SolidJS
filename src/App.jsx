import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import WeatherCard from './components/WeatherCard';

export default function App() {
  return (
    <div class="app">
      <h1 class="app-title">Clima</h1>
      <SearchBar />
      <SearchHistory />
      <WeatherCard />
    </div>
  );
}
