import { useState, useEffect } from 'react';

const QUOTE_API_URL = import.meta.env.VITE_QUOTES_API_URL;
const DAD_API_URL = import.meta.env.VITE_DADJOKE_API_URL;
const RANDOM_API_URL = import.meta.env.VITE_RANDOMJOKE_API_URL;
import { useSettings } from '../context/SettingsContext';

export const useQuotes = () => {
	const { settings } = useSettings();

	const [quote, setQuote] = useState(null);
	const [dadJoke, setDadJoke] = useState(null);
	const [randomJoke, setRandomJoke] = useState(null);
	const [loading, setLoading] = useState({
		quote: true,
		dad: true,
		random: true,
	});
	const [error, setError] = useState(null);

	const isNewDay = (timestamp) => {
		const storedDate = new Date(timestamp).toDateString();
		const todayDate = new Date().toDateString();

		return storedDate !== todayDate;
	};

	const fetchNewQuote = async () => {
		if (!settings.quoteCategory) return;
		try {
			const quotesRes = await fetch(
				`${QUOTE_API_URL}${settings.quoteCategory}`
			);

			if (!quotesRes.ok) throw new Error('Failed to fetch Quotes data');
			const quotesData = await quotesRes.json();

			const dataToStore = {
				content: quotesData.content,
				author: quotesData.author,
				timestamp: Date.now(),
			};
			localStorage.setItem('dailyQuote', JSON.stringify(dataToStore));

			setQuote(dataToStore);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading((prev) => ({ ...prev, quote: false }));
		}
	};

	const fetchDadJoke = async () => {
		try {
			const dadJokesRes = await fetch(DAD_API_URL, {
				headers: { Accept: 'application/json' },
			});

			if (!dadJokesRes.ok) throw new Error('Failed to fetch Dad Jokes data');
			const dadJokesData = await dadJokesRes.json();

			const dataToStore = {
				...dadJokesData,
				timestamp: Date.now(),
			};
			localStorage.setItem('dailyDadJoke', JSON.stringify(dataToStore));

			setDadJoke(dataToStore);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading((prev) => ({ ...prev, dad: false }));
		}
	};

	const fetchRandomJoke = async () => {
		try {
			const RandomJokesRes = await fetch(RANDOM_API_URL);

			if (!RandomJokesRes.ok)
				throw new Error('Failed to fetch Random Jokes data');
			const randomJokesData = await RandomJokesRes.json();

			const dataToStore = {
				...randomJokesData,
				timestamp: Date.now(),
			};
			localStorage.setItem('dailyRandomJoke', JSON.stringify(dataToStore));

			setRandomJoke(dataToStore);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading((prev) => ({ ...prev, random: false }));
		}
	};

	useEffect(() => {
		const stored = localStorage.getItem('dailyQuote');

		if (stored) {
			const qData = JSON.parse(stored);

			if (!isNewDay(qData.timestamp)) {
				setQuote(qData);
				setLoading((prev) => ({ ...prev, quote: false }));
				return;
			}
		}

		fetchNewQuote();
	}, [settings.quoteCategory]);

	useEffect(() => {
		const stored = localStorage.getItem('dailyDadJoke');

		if (stored) {
			const dData = JSON.parse(stored);

			if (!isNewDay(dData.timestamp)) {
				setDadJoke(dData);
				setLoading((prev) => ({ ...prev, dad: false }));
				return;
			}
		}

		fetchDadJoke();
	}, []);

	useEffect(() => {
		const stored = localStorage.getItem('dailyRandomJoke');

		if (stored) {
			const rData = JSON.parse(stored);

			if (!isNewDay(rData.timestamp)) {
				setRandomJoke(rData);
				setLoading((prev) => ({ ...prev, random: false }));
				return;
			}
		}

		fetchRandomJoke();
	}, []);

	return {
		quote,
		dadJoke,
		randomJoke,
		loading,
		error,
		fetchNewQuote,
		fetchDadJoke,
		fetchRandomJoke,
	};
};
