import { useState, useEffect } from 'react';

const WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_API_BASE;

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

import { useSettings } from '../context/SettingsContext';

export const useWeather = () => {
	const { settings } = useSettings();

	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState({
		curWeather: true,
		forWeather: true,
	});

	const getCurrentWeather = async (location) => {
		try {
			const res = await fetch(
				`${BASE_URL}/weather?q=${location}&appid=${WEATHER_KEY}&units=${settings.tempUnit}`
			);

			if (!res.ok) {
				if (res.status === 404) {
					throw new Error('City not found');
				}
				if (res.status === 401) {
					throw new Error('Invalid API key');
				}
				throw new Error('Failed to fetch current weather data');
			}

			const data = await res.json();
			setWeather(data);
			console.log(data);
		} catch (err) {
			setError(err.message);
			console.log('Weather API Error:', err.message);
		} finally {
			setLoading((prev) => ({ ...prev, curWeather: false }));
		}
	};

	const getForecastWeather = async (location) => {
		try {
			const res = await fetch(
				`${BASE_URL}/forecast?q=${location}&appid=${WEATHER_KEY}&units=${settings.tempUnit}`
			);

			if (!res.ok) {
				if (res.status === 404) {
					throw new Error('City not found');
				}
				if (res.status === 401) {
					throw new Error('Invalid API key');
				}
				throw new Error('Failed to fetch weather data');
			}

			const data = await res.json();
			console.log(data);
			setForecast(data);
		} catch (err) {
			setError(err.message);
			console.log('Weather API Error:', err.message);
		} finally {
			setLoading((prev) => ({ ...prev, forWeather: false }));
		}
	};

	useEffect(() => {
		if (!settings.location) {
			setLoading((prev) => ({
				...prev,
				curWeather: false,
				forWeather: false,
			}));
			return;
		}

		getCurrentWeather(settings.location);
		getForecastWeather(settings.location);
	}, [settings.location, settings.tempUnit]);

	return { weather, forecast, loading, error };
};
