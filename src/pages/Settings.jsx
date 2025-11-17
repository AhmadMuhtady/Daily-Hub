import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

import { Sun, Moon } from 'lucide-react';

const SettingsPage = () => {
	const { settings, updateSettings } = useSettings();
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="bg-white dark:bg-slate-800 shadow-md p-8 transition-all duration-200 p-8">
			<h1 className="text-blue-400 text-lg font-bold">Settings</h1>

			<Card hover className="mb-3">
				<h2 className="text-blue-400 font-bold">Appearance</h2>
				<div className="flex items-center gap-3 m-3 p-3">
					<span className="text-orange-300">Mode: </span>
					<button
						onClick={toggleTheme}
						className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
							theme === 'dark'
								? 'bg-gradient-to-r from-blue-900 to-blue-700' // Dark bg for dark mode
								: 'bg-gradient-to-r from-yellow-400 to-yellow-600' // Yellow bg for light mode
						}`}
					>
						<span
							className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
								theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
							}`}
						>
							{theme === 'dark' ? (
								<Moon size={14} className="text-blue-600" />
							) : (
								<Sun size={14} className="text-yellow-600" />
							)}
						</span>
					</button>
				</div>
			</Card>

			<Card hover className="mb-3">
				<h2 className="text-blue-400 font-bold">Weather</h2>

				<div className="flex items-center gap-3 m-3 p-3">
					<label className="text-orange-300">Location: </label>
					<Input
						className="text-black dark:text-white"
						type="text"
						value={settings.location}
						onChange={(e) => updateSettings({ location: e.target.value })}
						placeholder="Enter city name..."
					/>
				</div>
				<div className="flex items-center gap-3 m-3 p-3">
					<label className="text-orange-300">Temperature Unit: </label>
					<select
						value={settings.tempUnit}
						onChange={(e) => updateSettings({ tempUnit: e.target.value })}
						className="p-2 border rounded-lg bg-white dark:bg-slate-700 dark:text-white"
					>
						<option value="C">Celsius (°C)</option>
						<option value="F">Fahrenheit (°F)</option>
					</select>
				</div>
			</Card>

			{/* More cards... */}
			<Card hover className="mb-3">
				<h2 className="text-blue-400 font-bold p-5">Time & Date</h2>
				<div>
					<label className="text-orange-300">Time format: </label>
					<select
						value={settings.timeFormat}
						onChange={(e) => updateSettings({ timeFormat: e.target.value })}
						className="p-2 border rounded-lg bg-white dark:bg-slate-700 dark:text-white"
					>
						<option value="12h">12 Hours</option>
						<option value="24h">24 Hours</option>
					</select>
				</div>
			</Card>

			<Card hover className="mb-3">
				<h2 className="text-blue-400 font-bold p-5">News</h2>
				<div className="flex items-center gap-3 p-3">
					<label className="text-orange-300">News Category: </label>
					<select
						value={settings.newsCategory}
						onChange={(e) => updateSettings({ newsCategory: e.target.value })}
						className="p-2 border rounded-lg bg-white dark:bg-slate-700 dark:text-white"
					>
						<option value="general">General</option>
						<option value="technology">Technology</option>
						<option value="sports">Sports</option>
						<option value="business">Business</option>
						<option value="entertainment">Entertainment</option>
					</select>
				</div>
			</Card>

			<Card hover className="mb-3">
				<h2 className="text-blue-400 font-bold p-5">Quotes</h2>
				<div className="flex items-center gap-3 p-3">
					<label className="text-orange-300">Category: </label>
					<select
						value={settings.quoteCategory}
						onChange={(e) => updateSettings({ quoteCategory: e.target.value })}
						className="p-2 border rounded-lg bg-white dark:bg-slate-700 dark:text-white"
					>
						<option value="inspirational">Inspirational</option>
						<option value="motivational">Motivational</option>
						<option value="life">Life</option>
						<option value="wisdom">Wisdom</option>
						<option value="success">Success</option>
						<option value="happiness">Happiness</option>
						<option value="famous-quotes">Famous Quotes</option>
					</select>
				</div>
			</Card>

			<Card hover className="mb-3">
				<h2 className="text-blue-400 font-bold p-5">Alerts</h2>
				<div className="flex items-center gap-3 mb-3">
					<span className="text-orange-300 dark:text-orange-300">
						Weather Alerts
					</span>

					<button
						onClick={() =>
							updateSettings({ weatherAlerts: !settings.weatherAlerts })
						}
						className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
							settings.weatherAlerts ? 'bg-green-500' : 'bg-gray-400'
						}`}
					>
						<span
							className={`absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
								settings.weatherAlerts ? 'translate-x-0' : '-translate-x-6'
							}`}
						/>
					</button>
				</div>

				<div className="flex items-center gap-8">
					<span className="text-orange-300 dark:text-orange-300">
						News Alerts
					</span>

					<button
						onClick={() =>
							updateSettings({ newsUpdates: !settings.newsUpdates })
						}
						className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
							settings.newsUpdates ? 'bg-green-500' : 'bg-gray-400'
						}`}
					>
						<span
							className={`absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
								settings.newsUpdates ? 'translate-x-0' : '-translate-x-6'
							}`}
						/>
					</button>
				</div>
			</Card>
		</div>
	);
};

export default SettingsPage;
