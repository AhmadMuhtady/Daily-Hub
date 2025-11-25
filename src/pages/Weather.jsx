import { useState, useEffect } from 'react';

import { useWeather } from '../hooks/useWeather';
import { useSettings } from '../context/SettingsContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

import {
	Cloud,
	Sun,
	Moon,
	CloudMoon,
	CloudRain,
	CloudDrizzle,
	CloudSnow,
	Wind,
	CloudFog,
	Droplets,
	Gauge,
	Eye,
	Sunrise,
	Sunset,
	Thermometer,
	Calendar,
	Star,
} from 'lucide-react';

import Spinner from '../components/layout/Spinner';
import Button from '../components/ui/Button';

const WeatherPage = () => {
	const {
		settings,
		updateSettings,
		favoriteCities,
		toggleFavorite,
		isFavorite,
	} = useSettings();
	const { weather, forecast, loading, error } = useWeather();

	const [localCity, setLocalCity] = useState(settings.location);

	const cityName = weather?.name;
	const countryName = weather?.sys?.country;
	const temp = Math.round(weather?.main?.temp);
	const feelsLike = Math.round(weather?.main?.feels_like);
	const description = weather?.weather[0]?.description;

	const humidity = weather?.main?.humidity;
	const wind = weather?.wind?.speed;
	const pressure = weather?.main?.pressure;
	const visibility = (weather?.visibility / 1000).toFixed(1);
	const clouds = weather?.clouds?.all;

	const sunrise = new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString(
		'en-US',
		{
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		}
	);
	const sunset = new Date(weather?.sys?.sunset * 1000).toLocaleTimeString(
		'en-US',
		{
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		}
	);

	const tempMax = Math.round(weather?.main?.temp_max);
	const tempMin = Math.round(weather?.main?.temp_min);

	const getCurrentCityTime = () => {
		if (!weather || !weather.timezone) return '';

		const now = new Date();
		const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
		const cityTime = new Date(utcTime + weather.timezone * 1000);

		return cityTime.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	};

	const formatted = getCurrentCityTime();

	const isNight = () => {
		const now = Math.floor(Date.now() / 1000);
		const sunrise = weather?.sys?.sunrise;
		const sunset = weather?.sys?.sunset;
		return now < sunrise || now > sunset;
	};

	const getWeatherIconComponent = (
		condition,
		size = 100,
		isNightTime = false
	) => {
		const baseClasses = 'drop-shadow-lg transition-all duration-300';

		const iconMap = {
			night: {
				clear: { Icon: Moon, color: 'text-yellow-200 dark:text-yellow-300' },
				clouds: {
					Icon: CloudMoon,
					color: 'text-slate-300 dark:text-slate-400',
				},
				rain: { Icon: CloudRain, color: 'text-cyan-400 dark:text-cyan-500' },
				drizzle: {
					Icon: CloudDrizzle,
					color: 'text-blue-400 dark:text-blue-500',
				},
				snow: { Icon: CloudSnow, color: 'text-blue-200 dark:text-blue-300' },
				fog: { Icon: CloudFog, color: 'text-slate-300 dark:text-slate-400' },
				thunderstorm: {
					Icon: CloudRain,
					color: 'text-purple-400 dark:text-purple-500',
				},
				default: { Icon: Wind, color: 'text-teal-300 dark:text-teal-400' },
			},
			day: {
				clear: { Icon: Sun, color: 'text-yellow-500 dark:text-yellow-400' },
				clouds: { Icon: Cloud, color: 'text-slate-400 dark:text-slate-500' },
				rain: { Icon: CloudRain, color: 'text-blue-500 dark:text-blue-600' },
				drizzle: {
					Icon: CloudDrizzle,
					color: 'text-cyan-500 dark:text-cyan-600',
				},
				snow: { Icon: CloudSnow, color: 'text-blue-300 dark:text-blue-400' },
				fog: { Icon: CloudFog, color: 'text-slate-400 dark:text-slate-500' },
				thunderstorm: {
					Icon: CloudRain,
					color: 'text-purple-500 dark:text-purple-600',
				},
				default: { Icon: Wind, color: 'text-teal-500 dark:text-teal-600' },
			},
		};

		const timeMap = isNightTime ? iconMap.night : iconMap.day;

		if (['mist', 'haze', 'fog'].includes(condition)) {
			condition = 'fog';
		}

		const { Icon, color } = timeMap[condition] || timeMap.default;

		return <Icon size={size} className={`${baseClasses} ${color}`} />;
	};

	const getWeatherIcon = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
		const night = isNight();
		return getWeatherIconComponent(condition, 100, night);
	};

	const getDailyForecasts = () => {
		if (!forecast || !forecast.list) return [];

		return forecast.list
			.filter((item) => item.dt_txt.includes('12:00:00'))
			.slice(0, 5);
	};

	const dailyForecasts = getDailyForecasts();

	const formatDay = (dateString) => {
		const date = new Date(dateString);
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		if (date.toDateString() === today.toDateString()) {
			return 'Today';
		} else if (date.toDateString() === tomorrow.toDateString()) {
			return 'Tomorrow';
		}

		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
		});
	};

	useEffect(() => {
		setLocalCity(settings.location);
	}, [settings.location]);

	const handleCitySubmit = () => {
		if (localCity && localCity.trim().length >= 2) {
			updateSettings({ location: localCity.trim() });
		}
	};

	if (loading.curWeather) {
		return <Spinner fullScreen />;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-all duration-200 relative z-0">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Settings Card */}
				<Card className="bg-white dark:bg-slate-800 shadow-lg">
					<h1 className="text-blue-600 dark:text-blue-400 text-3xl font-bold mb-6">
						Weather
					</h1>

					<div className="space-y-4">
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
							<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px]">
								Location:
							</label>
							<Input
								className="flex-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700"
								type="text"
								value={localCity}
								onChange={(e) => setLocalCity(e.target.value)}
								onBlur={handleCitySubmit}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										handleCitySubmit();
									}
								}}
								placeholder="Enter city name..."
							/>
						</div>

						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
							<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[140px]">
								Temperature Unit:
							</label>
							<select
								value={settings.tempUnit}
								onChange={(e) => updateSettings({ tempUnit: e.target.value })}
								className="flex-1 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
							>
								<option value="metric">Celsius (°C)</option>
								<option value="imperial">Fahrenheit (°F)</option>
							</select>
						</div>

						{favoriteCities.length > 0 && (
							<div className="flex flex-col gap-2 mt-3">
								<label className="text-gray-700 dark:text-gray-300 font-medium text-lg">
									Favorite Cities:
								</label>
								<div className="flex flex-wrap gap-3 mt-3">
									{favoriteCities.map((city) => (
										<Button
											key={city}
											onClick={() => {
												setLocalCity(city);
												updateSettings({ location: city });
											}}
											variant="primary"
											size="lg"
										>
											{city}
										</Button>
									))}
								</div>
							</div>
						)}
					</div>
				</Card>

				{error && (
					<Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
						<p className="text-red-600 dark:text-red-400 text-lg">
							Error: {error}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
							Please check the city name and try again
						</p>
					</Card>
				)}

				{!error && weather && (
					<div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 rounded-3xl p-6 md:p-8 shadow-2xl">
						<Card
							hover
							className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start gap-4 mb-8"
						>
							<div>
								<div className="flex items-center gap-3">
									<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2">
										{cityName}
									</h2>
									<Button
										onClick={() => toggleFavorite(cityName)}
										variant="secondary"
										size="lg"
										className="hover:scale-105 transition-transform"
									>
										<Star
											size={32}
											className={`${
												isFavorite(cityName)
													? 'fill-yellow-400 text-yellow-400'
													: 'text-black-500 dark:text-gray-500'
											}`}
										/>
									</Button>
								</div>
								<p className="text-xl text-gray-600 dark:text-gray-300">
									{countryName}
								</p>
							</div>
							<div className="text-left sm:text-right">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{formatted}
								</p>
							</div>
						</Card>

						<div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 lg:gap-12 mb-8">
							<Card
								hover
								className="w-full lg:w-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6"
							>
								<div className="animate-pulse">{getWeatherIcon()}</div>

								<div className="text-center flex-1">
									<div className="flex items-start justify-center">
										<span className="text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white leading-none">
											{temp}
										</span>
										<span className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-gray-300 mt-2">
											{settings.tempUnit === 'metric' ? '°C' : '°F'}
										</span>
									</div>
									<p className="text-gray-600 dark:text-gray-400 text-lg mt-4">
										Feels like {feelsLike}
										{settings.tempUnit === 'metric' ? '°C' : '°F'}
									</p>
								</div>

								<div className="pt-4 border-t border-gray-300 dark:border-gray-600 w-full text-center">
									<p className="text-xl text-gray-800 dark:text-gray-200 capitalize font-semibold">
										{description}
									</p>
								</div>
							</Card>

							<div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Droplets
										className="text-cyan-500 dark:text-cyan-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Humidity
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{humidity}%
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Wind
										className="text-cyan-500 dark:text-cyan-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Wind
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{wind} km/h
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Gauge
										className="text-cyan-500 dark:text-cyan-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Pressure
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{pressure} hPa
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Eye className="text-cyan-500 dark:text-cyan-400" size={32} />
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Visibility
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{visibility} km
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Cloud
										className="text-cyan-500 dark:text-cyan-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Clouds
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{clouds}%
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Sunrise
										className="text-orange-500 dark:text-orange-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Sunrise
									</p>
									<span className="text-gray-900 dark:text-white text-xl font-bold">
										{sunrise}
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Sunset
										className="text-orange-500 dark:text-orange-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Sunset
									</p>
									<span className="text-gray-900 dark:text-white text-xl font-bold">
										{sunset}
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Thermometer
										className="text-red-500 dark:text-red-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Max Temp
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{tempMax}
										{settings.tempUnit === 'metric' ? '°C' : '°F'}
									</span>
								</Card>

								<Card
									hover
									className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
								>
									<Thermometer
										className="text-blue-500 dark:text-blue-400"
										size={32}
									/>
									<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
										Min Temp
									</p>
									<span className="text-gray-900 dark:text-white text-2xl font-bold">
										{tempMin}
										{settings.tempUnit === 'metric' ? '°C' : '°F'}
									</span>
								</Card>
							</div>
						</div>

						{/* 5-Day Forecast Section */}
						{loading.forWeather ? (
							<div className="flex justify-center p-8">
								<Spinner />
							</div>
						) : dailyForecasts.length > 0 ? (
							<div className="space-y-6">
								<Card
									hover
									className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm"
								>
									<div className="flex items-center gap-3 mb-6">
										<Calendar
											className="text-blue-500 dark:text-blue-400"
											size={28}
										/>
										<h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
											5-Day Forecast
										</h2>
									</div>

									<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
										{dailyForecasts.map((day, index) => {
											const condition = day.weather[0]?.main?.toLowerCase();
											return (
												<Card
													key={index}
													hover
													className="bg-gradient-to-br from-white/60 to-white/40 dark:from-slate-700/60 dark:to-slate-700/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 space-y-3 group cursor-pointer transform transition-all duration-300 hover:scale-105"
												>
													<p className="text-gray-900 dark:text-white font-bold text-base text-center">
														{formatDay(day.dt_txt)}
													</p>

													<div className="my-2">
														{getWeatherIconComponent(condition, 48, false)}
													</div>

													<div className="text-center space-y-1">
														<p className="text-gray-900 dark:text-white text-2xl font-bold">
															{Math.round(day.main.temp)}
															{settings.tempUnit === 'metric' ? '°' : '°F'}
														</p>
														<p className="text-gray-600 dark:text-gray-400 text-xs">
															{Math.round(day.main.temp_max)}° /{' '}
															{Math.round(day.main.temp_min)}°
														</p>
													</div>

													<p className="text-gray-700 dark:text-gray-300 text-xs capitalize text-center leading-tight">
														{day.weather[0].description}
													</p>
												</Card>
											);
										})}
									</div>
								</Card>
							</div>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export default WeatherPage;
