import { useQuotes } from '../hooks/useQuotes';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/layout/Spinner';
import { Quote as QuoteIcon, Laugh, Smile, RefreshCw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const QuotePage = () => {
	const { settings, updateSettings } = useSettings();

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
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-all duration-200">
			<div className="max-w-5xl mx-auto space-y-6">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-blue-600 dark:text-blue-400 text-4xl md:text-5xl font-bold mb-2">
						Quotes & Jokes
					</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Get inspired, motivated, and have a laugh!
					</p>
				</div>

				{/* Settings Card */}
				<Card className="bg-white dark:bg-slate-800 shadow-lg">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
						<label className="text-gray-700 dark:text-gray-300 font-medium min-w-[100px]">
							Quote Category:
						</label>
						<select
							value={settings.quoteCategory}
							onChange={(e) =>
								fetchNewQuote(updateSettings({ quoteCategory: e.target.value }))
							}
							className="flex-1 p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
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

				{/* Inspirational Quote Section */}
				<div className="space-y-4">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
						<QuoteIcon
							className="text-purple-500 dark:text-purple-400"
							size={28}
						/>
						Inspirational Quote
					</h2>

					{loading.quote ? (
						<Card className="bg-white dark:bg-slate-800 shadow-lg flex justify-center items-center min-h-[200px]">
							<Spinner />
						</Card>
					) : quote ? (
						<Card
							hover
							className="bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-900 dark:to-pink-900 shadow-xl"
						>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<QuoteIcon
										className="text-white/80 flex-shrink-0 mt-1"
										size={32}
									/>
									<div className="flex-1">
										<p className="text-2xl md:text-3xl italic text-white font-medium leading-relaxed">
											"{quote.content}"
										</p>
										<p className="text-lg text-white/90 mt-4 font-semibold">
											— {quote.author}
										</p>
									</div>
								</div>

								<Button
									onClick={fetchNewQuote}
									className="bg-white text-purple-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-purple-400 dark:hover:bg-slate-700 font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
								>
									<RefreshCw size={18} />
									New Quote
								</Button>
							</div>
						</Card>
					) : (
						<Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
							<p className="text-red-600 dark:text-red-400">
								Failed to load quote. Please try again.
							</p>
						</Card>
					)}
				</div>

				{/* Dad Joke Section */}
				<div className="space-y-4">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
						<Laugh className="text-orange-500 dark:text-orange-400" size={28} />
						Dad Joke
					</h2>

					{loading.dad ? (
						<Card className="bg-white dark:bg-slate-800 shadow-lg flex justify-center items-center min-h-[200px]">
							<Spinner />
						</Card>
					) : dadJoke ? (
						<Card
							hover
							className="bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-900 dark:to-red-900 shadow-xl"
						>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<Laugh
										className="text-white/80 flex-shrink-0 mt-1"
										size={32}
									/>
									<div className="flex-1">
										<p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
											{dadJoke.joke}
										</p>
									</div>
								</div>

								<Button
									onClick={fetchDadJoke}
									className="bg-white text-orange-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-orange-400 dark:hover:bg-slate-700 font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
								>
									<RefreshCw size={18} />
									New Dad Joke
								</Button>
							</div>
						</Card>
					) : (
						<Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
							<p className="text-red-600 dark:text-red-400">
								Failed to load dad joke. Please try again.
							</p>
						</Card>
					)}
				</div>

				{/* Random Joke Section */}
				<div className="space-y-4">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
						<Smile className="text-green-500 dark:text-green-400" size={28} />
						Random Joke
					</h2>

					{loading.random ? (
						<Card className="bg-white dark:bg-slate-800 shadow-lg flex justify-center items-center min-h-[200px]">
							<Spinner />
						</Card>
					) : randomJoke ? (
						<Card
							hover
							className="bg-gradient-to-br from-green-400 to-teal-500 dark:from-green-900 dark:to-teal-900 shadow-xl"
						>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<Smile
										className="text-white/80 flex-shrink-0 mt-1"
										size={32}
									/>
									<div className="flex-1 space-y-4">
										<p className="text-2xl md:text-3xl text-white font-medium leading-relaxed">
											{randomJoke.setup}
										</p>
										<p className="text-xl md:text-2xl text-white/90 font-semibold pl-4 border-l-4 border-white/40">
											{randomJoke.punchline}
										</p>
									</div>
								</div>

								<Button
									onClick={fetchRandomJoke}
									className="bg-white text-green-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-slate-700 font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
								>
									<RefreshCw size={18} />
									New Joke
								</Button>
							</div>
						</Card>
					) : (
						<Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
							<p className="text-red-600 dark:text-red-400">
								Failed to load joke. Please try again.
							</p>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuotePage;
