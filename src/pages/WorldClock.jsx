import { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Clock, Plus, X, Globe, MapPin } from 'lucide-react';

const WorldClockPage = () => {
	const { settings, addClock, removeClock, updateSettings } = useSettings();
	const [selectedCity, setSelectedCity] = useState('');
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const getTimeForZone = (timezone) => {
		return currentTime.toLocaleTimeString('en-US', {
			timeZone: timezone,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: settings.timeFormat === '12h',
		});
	};

	const getDateForZone = (timezone) => {
		return currentTime.toLocaleDateString('en-US', {
			timeZone: timezone,
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
	};

	const POPULAR_CITIES = [
		{ city: 'New York', timezone: 'America/New_York', region: 'Americas' },
		{
			city: 'Los Angeles',
			timezone: 'America/Los_Angeles',
			region: 'Americas',
		},
		{ city: 'London', timezone: 'Europe/London', region: 'Europe' },
		{ city: 'Paris', timezone: 'Europe/Paris', region: 'Europe' },
		{ city: 'Tokyo', timezone: 'Asia/Tokyo', region: 'Asia' },
		{ city: 'Dubai', timezone: 'Asia/Dubai', region: 'Middle East' },
		{ city: 'Sydney', timezone: 'Australia/Sydney', region: 'Oceania' },
		{ city: 'Mumbai', timezone: 'Asia/Kolkata', region: 'Asia' },
		{ city: 'Singapore', timezone: 'Asia/Singapore', region: 'Asia' },
		{ city: 'Hong Kong', timezone: 'Asia/Hong_Kong', region: 'Asia' },
		{ city: 'Moscow', timezone: 'Europe/Moscow', region: 'Europe' },
		{ city: 'Berlin', timezone: 'Europe/Berlin', region: 'Europe' },
		{ city: 'Rome', timezone: 'Europe/Rome', region: 'Europe' },
		{ city: 'Madrid', timezone: 'Europe/Madrid', region: 'Europe' },
		{ city: 'Toronto', timezone: 'America/Toronto', region: 'Americas' },
		{
			city: 'Mexico City',
			timezone: 'America/Mexico_City',
			region: 'Americas',
		},
		{ city: 'São Paulo', timezone: 'America/Sao_Paulo', region: 'Americas' },
		{ city: 'Cairo', timezone: 'Africa/Cairo', region: 'Africa' },
		{ city: 'Istanbul', timezone: 'Europe/Istanbul', region: 'Europe' },
		{ city: 'Seoul', timezone: 'Asia/Seoul', region: 'Asia' },
		{ city: 'Shanghai', timezone: 'Asia/Shanghai', region: 'Asia' },
		{ city: 'Bangkok', timezone: 'Asia/Bangkok', region: 'Asia' },
		{ city: 'Beirut', timezone: 'Asia/Beirut', region: 'Middle East' },
	];

	// Group cities by region for better organization
	const groupedCities = POPULAR_CITIES.reduce((acc, city) => {
		if (!acc[city.region]) {
			acc[city.region] = [];
		}
		acc[city.region].push(city);
		return acc;
	}, {});

	const handleAddClock = () => {
		if (!selectedCity) {
			// Better user feedback instead of alert
			return;
		}

		const city = POPULAR_CITIES.find((c) => c.timezone === selectedCity);
		if (city) {
			// Check if clock already exists
			const alreadyExists = settings.savedClocks?.some(
				(c) => c.timezone === city.timezone
			);

			if (alreadyExists) {
				// Could show a toast notification here
				return;
			}

			addClock(city.city, city.timezone);
			setSelectedCity('');
		}
	};

	const getTimezoneOffset = (timezone) => {
		const now = new Date();
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: timezone,
			timeZoneName: 'short',
		});
		return formatter.formatToParts(now).find((p) => p.type === 'timeZoneName')
			?.value;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-all duration-200 relative z-0">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<Globe className="text-blue-600 dark:text-blue-400" size={32} />
						<h1 className="text-blue-600 dark:text-blue-400 text-4xl font-bold">
							World Clock
						</h1>
					</div>
					<p className="text-gray-600 dark:text-gray-400 ml-11">
						Track time across different cities around the world
					</p>
				</div>

				{/* Settings Card */}
				<Card className="bg-white dark:bg-slate-800 shadow-lg space-y-4">
					<div className="flex items-center gap-3 mb-4">
						<Clock className="text-green-500 dark:text-green-400" size={24} />
						<h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold">
							Clock Settings
						</h2>
					</div>

					<div className="space-y-4">
						{/* Time Format */}
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

						{/* Add Clock */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
							<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px] flex items-center gap-2">
								<MapPin size={18} />
								Add Clock:
							</label>
							<div className="flex-1 flex flex-col sm:flex-row gap-2">
								<select
									value={selectedCity}
									onChange={(e) => setSelectedCity(e.target.value)}
									className="flex-1 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
									disabled={settings.savedClocks?.length >= 12}
								>
									<option value="">-- Select a city --</option>
									{Object.entries(groupedCities).map(([region, cities]) => (
										<optgroup key={region} label={region}>
											{cities.map((city) => (
												<option
													key={city.timezone}
													value={city.timezone}
													disabled={settings.savedClocks?.some(
														(c) => c.timezone === city.timezone
													)}
												>
													{city.city}
													{settings.savedClocks?.some(
														(c) => c.timezone === city.timezone
													)
														? ' (Added)'
														: ''}
												</option>
											))}
										</optgroup>
									))}
								</select>
								<Button
									onClick={handleAddClock}
									variant="primary"
									disabled={!selectedCity || settings.savedClocks?.length >= 12}
									className="sm:w-auto w-full"
								>
									<Plus size={20} />
									<span className="ml-2">Add</span>
								</Button>
							</div>
						</div>

						{/* Clock count indicator */}
						{settings.savedClocks?.length > 0 && (
							<div className="text-sm text-gray-600 dark:text-gray-400 text-center p-2">
								{settings.savedClocks.length} of 12 clocks added
							</div>
						)}
					</div>
				</Card>

				{/* Clock Grid */}
				{settings.savedClocks?.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{settings.savedClocks.map((clock) => (
							<Card
								key={clock.timezone}
								hover
								className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-6 relative group transform transition-all duration-300 hover:scale-105"
							>
								{/* Remove Button */}
								<button
									onClick={() => removeClock(clock.timezone)}
									className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-red-500/80 dark:bg-slate-800/40 dark:hover:bg-red-600/80 transition-all duration-200 opacity-0 group-hover:opacity-100"
									aria-label={`Remove ${clock.city} clock`}
								>
									<X size={18} className="text-white" />
								</button>

								{/* City name */}
								<div className="flex items-center gap-2 mb-4">
									<Clock className="text-white/90" size={24} />
									<h3 className="text-white text-xl font-bold truncate">
										{clock.city}
									</h3>
								</div>

								{/* Time */}
								<div className="text-white text-4xl md:text-5xl font-black mb-2 tracking-tight tabular-nums">
									{getTimeForZone(clock.timezone)}
								</div>

								{/* Date */}
								<div className="text-white/80 text-sm font-medium">
									{getDateForZone(clock.timezone)}
								</div>

								<div className="text-white/60 text-xs mt-2">
									{getTimezoneOffset(clock.timezone)}
								</div>
							</Card>
						))}
					</div>
				) : (
					<Card className="bg-white dark:bg-slate-800 shadow-lg p-12 text-center">
						<Globe
							className="mx-auto mb-4 text-gray-400 dark:text-gray-600"
							size={64}
						/>
						<h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
							No Clocks Added Yet
						</h3>
						<p className="text-gray-600 dark:text-gray-400">
							Select a city from the dropdown above to add your first clock
						</p>
					</Card>
				)}
			</div>
		</div>
	);
};

export default WorldClockPage;
