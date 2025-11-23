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
} from 'lucide-react';

import Spinner from '../components/layout/Spinner';

const WeatherPage = () => {
	const { settings, updateSettings } = useSettings();
	const { weather, forecast, loading, error } = useWeather();

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

	const getWeatherIcon = () => {
		const condition = weather?.weather[0]?.main?.toLowerCase();
		const night = isNight();
		const size = 100;

		if (night) {
			switch (condition) {
				case 'clear':
					return <Moon size={size} className="text-yellow-200" />;
				case 'clouds':
					return <CloudMoon size={size} className="text-slate-300" />;
				case 'rain':
					return <CloudRain size={size} className="text-cyan-400" />;
				case 'drizzle':
					return <CloudDrizzle size={size} className="text-blue-400" />;
				case 'snow':
					return <CloudSnow size={size} className="text-blue-200" />;
				case 'mist':
				case 'fog':
				case 'haze':
					return <CloudFog size={size} className="text-slate-300" />;
				default:
					return <Wind size={size} className="text-teal-300" />;
			}
		}

		switch (condition) {
			case 'clear':
				return <Sun size={size} className="text-yellow-500" />;
			case 'clouds':
				return <Cloud size={size} className="text-slate-400" />;
			case 'rain':
				return <CloudRain size={size} className="text-blue-500" />;
			case 'drizzle':
				return <CloudDrizzle size={size} className="text-cyan-500" />;
			case 'snow':
				return <CloudSnow size={size} className="text-blue-300" />;
			case 'mist':
			case 'fog':
			case 'haze':
				return <CloudFog size={size} className="text-slate-400" />;
			default:
				return <Wind size={size} className="text-teal-500" />;
		}
	};

	if (loading.curWeather) {
		return (
			<div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-slate-900">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
				<Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
					<p className="text-red-600 dark:text-red-400 text-lg">
						Error: {error}
					</p>
				</Card>
			</div>
		);
	}

	if (!weather) {
		return (
			<div className="p-8 bg-gray-50 dark:bg-slate-900 min-h-screen">
				<Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
					<p className="text-orange-600 dark:text-orange-400 text-lg">
						Please enter a city name in Settings
					</p>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-all duration-200">
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
								value={settings.location}
								onChange={(e) => updateSettings({ location: e.target.value })}
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
					</div>
				</Card>

				{/* Main Weather Display */}
				<div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 rounded-3xl p-6 md:p-8 shadow-2xl">
					{/* City Header */}
					<Card
						hover
						className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start gap-4 mb-8"
					>
						<div>
							<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2">
								{cityName}
							</h2>
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

					{/* Main Content Grid */}
					<div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 lg:gap-12">
						{/* Main Temperature Display */}
						<Card
							hover
							className="w-full lg:w-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6"
						>
							<div>{getWeatherIcon()}</div>

							<div className="text-center">
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

						{/* Weather Stats Grid */}
						<div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
							{/* Humidity */}
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

							{/* Wind */}
							<Card
								hover
								className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
							>
								<Wind className="text-cyan-500 dark:text-cyan-400" size={32} />
								<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
									Wind
								</p>
								<span className="text-gray-900 dark:text-white text-2xl font-bold">
									{wind} km/h
								</span>
							</Card>

							{/* Pressure */}
							<Card
								hover
								className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
							>
								<Gauge className="text-cyan-500 dark:text-cyan-400" size={32} />
								<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
									Pressure
								</p>
								<span className="text-gray-900 dark:text-white text-2xl font-bold">
									{pressure} hPa
								</span>
							</Card>

							{/* Visibility */}
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

							{/* Clouds */}
							<Card
								hover
								className="flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 md:p-5"
							>
								<Cloud className="text-cyan-500 dark:text-cyan-400" size={32} />
								<p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
									Clouds
								</p>
								<span className="text-gray-900 dark:text-white text-2xl font-bold">
									{clouds}%
								</span>
							</Card>

							{/* Sunrise */}
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

							{/* Sunset */}
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

							{/* Max Temp */}
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

							{/* Min Temp */}
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
				</div>
			</div>
		</div>
	);
};

export default WeatherPage;
