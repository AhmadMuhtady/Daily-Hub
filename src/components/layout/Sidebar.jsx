import { Link } from 'react-router-dom';
import {
	LayoutDashboardIcon,
	ThermometerSunIcon,
	CalendarDaysIcon,
	NewspaperIcon,
	QuoteIcon,
	ListTodoIcon,
	CircleDollarSignIcon,
	Clock2Icon,
	MusicIcon,
	CogIcon,
	Sparkles,
} from 'lucide-react';

import { useSideBar } from '../../context/SideBarContext';

const SlideBar = () => {
	const { SideBarOpen } = useSideBar();
	return (
		<div
			className={`fixed ${
				SideBarOpen ? 'w-[200px]' : 'w-[60px]'
			} transition-all duration-200 bg-white dark:bg-slate-800 dark:text-white shadow-xl h-screen z-50 flex flex-col justify-between`}
		>
			<nav className="overflow-y-auto">
				<Link
					to="/"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<LayoutDashboardIcon size={24} />
					{SideBarOpen && <span>Dashboard</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Dashboard
						</span>
					)}
				</Link>
				<Link
					to="/weather"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<ThermometerSunIcon size={24} />
					{SideBarOpen && <span>Weather</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Weather
						</span>
					)}
				</Link>
				<Link
					to="/calender"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<CalendarDaysIcon size={24} />
					{SideBarOpen && <span>Calendar</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Calendar
						</span>
					)}
				</Link>
				<Link
					to="/news"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<NewspaperIcon size={24} />
					{SideBarOpen && <span>News</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							News
						</span>
					)}
				</Link>
				<Link
					to="/quotes"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<QuoteIcon size={24} />
					{SideBarOpen && <span>Quotes</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Quotes
						</span>
					)}
				</Link>
				<Link
					to="/horoscope"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<Sparkles size={24} />
					{SideBarOpen && <span>Horoscope</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Horoscope
						</span>
					)}
				</Link>
				<Link
					to="/todoList"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<ListTodoIcon size={24} />
					{SideBarOpen && <span>Todo</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Todo
						</span>
					)}
				</Link>
				<Link
					to="/currency"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<CircleDollarSignIcon size={24} />
					{SideBarOpen && <span>Currency</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Currency
						</span>
					)}
				</Link>
				<Link
					to="/worldClock"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<Clock2Icon size={24} />
					{SideBarOpen && <span>Clock</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Clock
						</span>
					)}
				</Link>
				<Link
					to="/moodPlayer"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<MusicIcon size={24} />
					{SideBarOpen && <span>Music</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Music
						</span>
					)}
				</Link>

				<Link
					to="/settings"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
				>
					<CogIcon size={24} />
					{SideBarOpen && <span>Settings</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
							Settings
						</span>
					)}
				</Link>
			</nav>
		</div>
	);
};

export default SlideBar;
