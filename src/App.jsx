import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import WeatherCard from './components/WeatherCard';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App() {
  return (
    <div class="app">
      <h1 class="app-title">App del Clima</h1>
      <SearchBar />
      <SearchHistory />
      <WeatherCard />
    </div>
  );
}
