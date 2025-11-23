import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

import {
	Sun,
	Moon,
	MapPin,
	Thermometer,
	Clock,
	Newspaper,
	Quote,
	Bell,
	Palette,
} from 'lucide-react';

const SettingsPage = () => {
	const { settings, updateSettings } = useSettings();
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-all duration-200">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-blue-600 dark:text-blue-400 text-4xl md:text-5xl font-bold mb-2">
						Settings
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Customize your DailyHub experience
					</p>
				</div>

				{/* Appearance Section */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<Palette
							className="text-purple-500 dark:text-purple-400"
							size={24}
						/>
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							Appearance
						</h2>
					</div>

					<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white dark:bg-slate-600 rounded-lg">
								{theme === 'dark' ? (
									<Moon
										className="text-blue-500 dark:text-blue-400"
										size={20}
									/>
								) : (
									<Sun className="text-yellow-500" size={20} />
								)}
							</div>
							<div>
								<p className="text-gray-800 dark:text-gray-200 font-medium">
									Theme Mode
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
								</p>
							</div>
						</div>

						<button
							onClick={toggleTheme}
							className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
								theme === 'dark'
									? 'bg-gradient-to-r from-blue-600 to-blue-800'
									: 'bg-gradient-to-r from-yellow-400 to-orange-500'
							}`}
						>
							<span
								className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
									theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
								}`}
							>
								{theme === 'dark' ? (
									<Moon size={14} className="text-blue-600" />
								) : (
									<Sun size={14} className="text-orange-500" />
								)}
							</span>
						</button>
					</div>
				</Card>

				{/* Weather Settings */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<MapPin className="text-blue-500 dark:text-blue-400" size={24} />
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							Weather
						</h2>
					</div>

					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
							<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px]">
								Location:
							</label>
							<Input
								className="flex-1 text-gray-900 dark:text-white bg-white dark:bg-slate-600"
								type="text"
								value={settings.location}
								onChange={(e) => updateSettings({ location: e.target.value })}
								placeholder="Enter city name..."
							/>
						</div>

						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
							<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px] flex items-center gap-2">
								<Thermometer size={18} />
								Temperature Unit:
							</label>
							<select
								value={settings.tempUnit}
								onChange={(e) => updateSettings({ tempUnit: e.target.value })}
								className="flex-1 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
							>
								<option value="metric">Celsius (°C)</option>
								<option value="imperial">Fahrenheit (°F)</option>
							</select>
						</div>
					</div>
				</Card>

				{/* Time & Date Settings */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<Clock className="text-green-500 dark:text-green-400" size={24} />
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							Time & Date
						</h2>
					</div>

					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
						<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px]">
							Time Format:
						</label>
						<select
							value={settings.timeFormat}
							onChange={(e) => updateSettings({ timeFormat: e.target.value })}
							className="flex-1 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
						>
							<option value="12h">12 Hours (AM/PM)</option>
							<option value="24h">24 Hours</option>
						</select>
					</div>
				</Card>

				{/* News Settings */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<Newspaper className="text-red-500 dark:text-red-400" size={24} />
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							News
						</h2>
					</div>

					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
						<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px]">
							News Category:
						</label>
						<select
							value={settings.newsCategory}
							onChange={(e) => updateSettings({ newsCategory: e.target.value })}
							className="flex-1 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
						>
							<option value="general">General</option>
							<option value="technology">Technology</option>
							<option value="sports">Sports</option>
							<option value="business">Business</option>
							<option value="entertainment">Entertainment</option>
						</select>
					</div>
				</Card>

				{/* Quotes Settings */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<Quote className="text-purple-500 dark:text-purple-400" size={24} />
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							Quotes
						</h2>
					</div>

					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
						<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px]">
							Quote Category:
						</label>
						<select
							value={settings.quoteCategory}
							onChange={(e) =>
								updateSettings({ quoteCategory: e.target.value })
							}
							className="flex-1 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
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

				{/* Alerts & Notifications */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<Bell className="text-orange-500 dark:text-orange-400" size={24} />
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							Alerts & Notifications
						</h2>
					</div>

					<div className="space-y-3">
						<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
									<MapPin
										className="text-blue-600 dark:text-blue-400"
										size={20}
									/>
								</div>
								<div>
									<p className="text-gray-800 dark:text-gray-200 font-medium">
										Weather Alerts
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Get notified about severe weather
									</p>
								</div>
							</div>

							<button
								onClick={() =>
									updateSettings({ weatherAlerts: !settings.weatherAlerts })
								}
								className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
									settings.weatherAlerts
										? 'bg-green-500 dark:bg-green-600'
										: 'bg-gray-300 dark:bg-gray-600'
								}`}
							>
								<span
									className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
										settings.weatherAlerts
											? 'right-1 translate-x-0'
											: 'left-1 translate-x-0'
									}`}
								/>
							</button>
						</div>

						<div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
									<Newspaper
										className="text-red-600 dark:text-red-400"
										size={20}
									/>
								</div>
								<div>
									<p className="text-gray-800 dark:text-gray-200 font-medium">
										News Alerts
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Get notified about breaking news
									</p>
								</div>
							</div>

							<button
								onClick={() =>
									updateSettings({ newsUpdates: !settings.newsUpdates })
								}
								className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
									settings.newsUpdates
										? 'bg-green-500 dark:bg-green-600'
										: 'bg-gray-300 dark:bg-gray-600'
								}`}
							>
								<span
									className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
										settings.newsUpdates
											? 'right-1 translate-x-0'
											: 'left-1 translate-x-0'
									}`}
								/>
							</button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default SettingsPage;
