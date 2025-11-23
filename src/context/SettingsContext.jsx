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
};

export const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState(() => {
		const stored = localStorage.getItem('Settings');
		return stored ? JSON.parse(stored) : defaultSettings;
	});

	useEffect(() => {
		localStorage.setItem('Settings', JSON.stringify(settings));
	}, [settings]);

	const updateSettings = (newSettings) => {
		setSettings((prev) => ({ ...prev, ...newSettings }));
	};

	return (
		<SettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	return useContext(SettingsContext);
};
