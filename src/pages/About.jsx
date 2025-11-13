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

	return (
		<div className="bg-white dark:bg-slate-800 shadow-md p-8 transition-all duration-200">
			<Card hover className="flex justify-center">
				<div className="flex justify-center items-center gap-2 font-bold text-xl">
					<RadarIcon className="text-red-500" />
					<div>
						<span className="text-blue-400">Daily</span>
						<span className="text-orange-300">Hub</span>
					</div>
				</div>
			</Card>

			<Card hover className="flex justify-center">
				<div>
					<h2 className="text-blue-400 font-bold text-lg">Description </h2>
					<p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
						This project is a multi–feature dashboard built with React and Vite.
						It includes tools like weather, news, currency converter, daily
						quotes, horoscope, a todo list, world clock, music player, and more.
					</p>
					<p className="text-lg leading-relaxed mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
						The goal of this project is to practice component structure, custom
						hooks, context API, API fetching, Tailwind styling, and creating a
						clean UI/UX with reusable components.
					</p>
				</div>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				{features.map((feature) => (
					<Card key={feature.name} hover className="group cursor-pointer">
						<div
							className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
						>
							<feature.icon size={32} className="text-white" />
						</div>

						<h3 className="text-blue-400 text-xl font-bold mb-2">
							{feature.name}
						</h3>

						<p className="text-gray-600 dark:text-gray-400 text-sm">
							{feature.description}
						</p>
					</Card>
				))}
			</div>

			<Card hover className="flex justify-center">
				<div className="mt-6 p-5 ext-gray-700 dark:text-gray-300">
					<h2 className="text-blue-400 font-bold text-lg">Tech Stack Used</h2>
					<ul className="list-disc ml-6 space-y-1">
						<li>React (Functional Components)</li>
						<li>React Router</li>
						<li>Context API + Custom Hooks</li>
						<li>Tailwind CSS</li>
						<li>Lucide Icons</li>
						<li>Vite</li>
					</ul>
				</div>
			</Card>
		</div>
	);
};

export default AboutPage;
