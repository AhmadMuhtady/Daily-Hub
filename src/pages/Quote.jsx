import { useQuotes } from '../hooks/useQuotes';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/layout/Spinner';
import { Quote as QuoteIcon, Laugh, Smile } from 'lucide-react';

const QuotePage = () => {
	const {
		quote,
		dadJoke,
		randomJoke,
		loading,
		fetchNewQuote,
		fetchDadJoke,
		fetchRandomJoke,
	} = useQuotes();

	return (
		<div className="bg-white dark:bg-slate-800 dark:text-white shadow-md p-8 transition-all duration-200 p-8 space-y-6">
			{loading.quote ? (
				<Spinner />
			) : quote ? (
				<Card hover className="mb-3 p-3">
					<div className="mb-3">
						<QuoteIcon />
						<p className="text-2xl italic p-2">"{quote.content}"</p>
						<p>— {quote.author}</p>
					</div>
					<Button onClick={fetchNewQuote}>New Quote</Button>
				</Card>
			) : (
				<p>Failed to load quote</p>
			)}

			{loading.dad ? (
				<Spinner />
			) : dadJoke ? (
				<Card hover className="mb-3 p-3">
					<div className="mb-3">
						<Laugh />
						<p className="text-2xl italic p-2">"{dadJoke.joke}"</p>
					</div>
					<Button onClick={fetchDadJoke}>New Dad Joke</Button>
				</Card>
			) : (
				<p>Failed to load quote</p>
			)}

			{loading.random ? (
				<Spinner />
			) : randomJoke ? (
				<Card hover className="mb-3 p-3">
					<div className="mb-3">
						<Smile />
						<p className="text-2xl italic p-2">"{randomJoke.setup}"</p>
						<p className="text-xl mt-2">{randomJoke.punchline}</p>
					</div>
					<Button onClick={fetchRandomJoke}>New Joke</Button>
				</Card>
			) : (
				<p>Failed to load quote</p>
			)}
		</div>
	);
};

export default QuotePage;
