import Card from '../components/ui/Card';

import {
	RadarIcon,
	ThermometerSunIcon,
	CalendarDaysIcon,
	NewspaperIcon,
	QuoteIcon,
	ListTodoIcon,
	CircleDollarSignIcon,
	Clock2Icon,
	MusicIcon,
	Sparkles,
	Code2,
	Rocket,
} from 'lucide-react';

const AboutPage = () => {
	const features = [
		{
			name: 'Weather',
			icon: ThermometerSunIcon,
			description: 'Real-time weather and forecasts',
			gradient: 'from-blue-400 to-cyan-500',
		},
		{
			name: 'News',
			icon: NewspaperIcon,
			description: 'Latest headlines and articles',
			gradient: 'from-purple-400 to-pink-500',
		},
		{
			name: 'Quote',
			icon: QuoteIcon,
			description: 'Daily inspirational quotes',
			gradient: 'from-orange-400 to-red-500',
		},
		{
			name: 'Todo',
			icon: ListTodoIcon,
			description: 'Manage your daily tasks',
			gradient: 'from-green-400 to-teal-500',
		},
		{
			name: 'Currency',
			icon: CircleDollarSignIcon,
			description: 'Convert currencies in real-time',
			gradient: 'from-yellow-400 to-orange-500',
		},
		{
			name: 'Clock',
			icon: Clock2Icon,
			description: 'World time zones at a glance',
			gradient: 'from-indigo-400 to-blue-500',
		},
		{
			name: 'Music',
			icon: MusicIcon,
			description: 'Ambient sounds for focus',
			gradient: 'from-pink-400 to-purple-500',
		},
		{
			name: 'Horoscope',
			icon: Sparkles,
			description: 'Your daily astrological forecast',
			gradient: 'from-purple-400 to-indigo-500',
		},
		{
			name: 'Calendar',
			icon: CalendarDaysIcon,
			description: 'Track events and holidays',
			gradient: 'from-teal-400 to-green-500',
		},
	];

	const techStack = [
		{ name: 'React', description: 'Functional Components & Hooks' },
		{ name: 'React Router', description: 'Client-side routing' },
		{ name: 'Context API', description: 'State management' },
		{ name: 'Tailwind CSS', description: 'Utility-first styling' },
		{ name: 'Lucide Icons', description: 'Beautiful icon library' },
		{ name: 'Vite', description: 'Lightning-fast build tool' },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 transition-all duration-200">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Hero Section */}
				<Card
					hover
					className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 shadow-2xl"
				>
					<div className="text-center space-y-4">
						<div className="flex justify-center items-center gap-3">
							<RadarIcon className="text-white" size={48} />
							<div className="text-5xl md:text-6xl font-black">
								<span className="text-white">Daily</span>
								<span className="text-yellow-300">Hub</span>
							</div>
						</div>
						<p className="text-white/90 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
							Your all-in-one productivity dashboard
						</p>
					</div>
				</Card>

				{/* Description Section */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-6">
					<div className="flex items-center gap-3 mb-4">
						<Rocket className="text-blue-500 dark:text-blue-400" size={32} />
						<h2 className="text-gray-800 dark:text-gray-200 text-3xl font-bold">
							About This Project
						</h2>
					</div>

					<div className="space-y-4">
						<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
							DailyHub is a comprehensive multi-feature dashboard built with
							modern web technologies. It combines essential productivity tools
							like weather forecasts, news updates, currency conversion, daily
							quotes, horoscopes, task management, world clock, music player,
							and more—all in one beautiful interface.
						</p>
						<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
							This project showcases best practices in React development,
							including component architecture, custom hooks, Context API for
							state management, API integration, and responsive design with
							Tailwind CSS. The focus is on creating a clean, intuitive user
							experience with reusable, maintainable code.
						</p>
					</div>
				</Card>

				{/* Features Grid */}
				<div>
					<h2 className="text-gray-800 dark:text-gray-200 text-3xl font-bold mb-6 text-center">
						Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{features.map((feature) => (
							<Card
								key={feature.name}
								hover
								className="bg-white dark:bg-slate-800 shadow-lg group cursor-pointer transform transition-all duration-300 hover:scale-105"
							>
								<div
									className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg transform transition-transform group-hover:rotate-6`}
								>
									<feature.icon size={32} className="text-white" />
								</div>

								<h3 className="text-gray-900 dark:text-white text-xl font-bold mb-2">
									{feature.name}
								</h3>

								<p className="text-gray-600 dark:text-gray-400">
									{feature.description}
								</p>
							</Card>
						))}
					</div>
				</div>

				{/* Tech Stack Section */}
				<Card hover className="bg-white dark:bg-slate-800 shadow-lg space-y-6">
					<div className="flex items-center gap-3 mb-4">
						<Code2 className="text-purple-500 dark:text-purple-400" size={32} />
						<h2 className="text-gray-800 dark:text-gray-200 text-3xl font-bold">
							Tech Stack
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{techStack.map((tech) => (
							<div
								key={tech.name}
								className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700"
							>
								<div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mt-2 flex-shrink-0" />
								<div>
									<h3 className="text-gray-900 dark:text-white font-bold text-lg">
										{tech.name}
									</h3>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										{tech.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</Card>

				{/* Footer Note */}
				<Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-2 border-blue-200 dark:border-blue-800">
					<p className="text-center text-gray-700 dark:text-gray-300 text-lg">
						Built with ❤️ using React, Tailwind CSS, and modern web technologies
					</p>
				</Card>
			</div>
		</div>
	);
};

export default AboutPage;
