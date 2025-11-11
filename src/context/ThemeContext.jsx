import { useState, useEffect, useContext, createContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		const stored = localStorage.getItem('theme');
		return stored || 'dark';
	});

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		const html = document.documentElement;
		html.classList.remove('dark');
		html.classList.remove('light');
		html.classList.add(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ toggleTheme, theme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	return useContext(ThemeContext);
};
