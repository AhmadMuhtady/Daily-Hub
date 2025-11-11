import { Routes, Route } from 'react-router-dom';

import CalenderPage from './pages/Calendar';
import CurrencyPage from './pages/Currency';
import DashboardPage from './pages/Dashboard';
import HoroscopePage from './pages/Horoscope';
import MoodPayerPage from './pages/MoodPlayer';
import NewsPage from './pages/News';
import QuotePage from './pages/Quote';
import SettingsPage from './pages/Settings';
import TodoListPage from './pages/TodoList';
import WeatherPage from './pages/Weather';
import WorldClockPage from './pages/WorldClock';
import AboutPage from './pages/About';
import PageNotFound from './pages/PageNotFound';

const App = () => {
	return (
		<Routes>
			<Route path="/about" element={<AboutPage />} />
			<Route path="/calendar" element={<CalenderPage />} />
			<Route path="/currency" element={<CurrencyPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/horoscope" element={<HoroscopePage />} />
			<Route path="/moodPlayer" element={<MoodPayerPage />} />
			<Route path="/news" element={<NewsPage />} />
			<Route path="/quotes" element={<QuotePage />} />
			<Route path="/setting" element={<SettingsPage />} />
			<Route path="/todoList" element={<TodoListPage />} />
			<Route path="weather" element={<WeatherPage />} />
			<Route path="worldClock" element={<WorldClockPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default App;
