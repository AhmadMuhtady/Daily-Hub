import { useState, useEffect, useContext, createContext } from 'react';

const SettingsContext = createContext();

const defaultSettings = {
	location: 'Beirut',
	tempUnit: 'metric',
	timeFormat: '24h',
	newsCategory: 'general',
	quoteCategory: 'inspirational',
	weatherAlerts: true,
	newsUpdates: true,
	savedClocks: [{ city: 'Beirut', timezone: 'Asia/Beirut' }],
};

export const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState(() => {
		const stored = localStorage.getItem('Settings');
		return stored ? JSON.parse(stored) : defaultSettings;
	});

	const [favoriteCities, setFavoriteCities] = useState(() => {
		const stored = localStorage.getItem('favorites');
		return stored ? JSON.parse(stored) : [settings.location];
	});

	const isFavorite = (city) => {
		return favoriteCities.includes(city);
	};

	const toggleFavorite = (city) => {
		setFavoriteCities((prev) => {
			const normalizedCity = city.trim();
			const existing = prev.includes(normalizedCity);

			if (existing) {
				// Remove from favorites
				return prev.filter((c) => c !== normalizedCity);
			}

			// Check max limit
			if (prev.length >= 5) {
				alert('Maximum 5 favorite cities allowed!');
				return prev;
			}

			return [...prev, normalizedCity];
		});
	};

	const addClock = (city, timezone) => {
		setSettings((prev) => {
			if (prev.savedClocks.length >= 12) {
				alert('Maximum 12 clocks allowed!');
				return prev;
			}

			const exists = prev.savedClocks.some(
				(clock) => clock.timezone === timezone
			);
			if (exists) {
				alert('Clock already exists!');
				return prev;
			}

			return {
				...prev,
				savedClocks: [...prev.savedClocks, { city, timezone }],
			};
		});
	};

	const removeClock = (timezone) => {
		setSettings((prev) => ({
			...prev,
			savedClocks: prev.savedClocks.filter(
				(clock) => clock.timezone !== timezone
			),
		}));
	};

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favoriteCities));
	}, [favoriteCities]);

	useEffect(() => {
		localStorage.setItem('Settings', JSON.stringify(settings));
	}, [settings]);

	const updateSettings = (newSettings) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	return (
		<SettingsContext.Provider
			value={{
				settings,
				updateSettings,
				favoriteCities,
				toggleFavorite,
				isFavorite,
				addClock,
				removeClock,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	return useContext(SettingsContext);
};
