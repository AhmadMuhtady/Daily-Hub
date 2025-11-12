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
	BadgeInfoIcon,
	CogIcon,
	Sparkles,
} from 'lucide-react';

import { useSideBar } from '../../context/SideBarContext';

const SlideBar = ({}) => {
	const { SideBarOpen } = useSideBar();
	return (
		<div
			className={`fixed ${
				SideBarOpen ? 'w-[200px]' : 'w-[60px]'
			} transition-all duration-300 bg-white dark:bg-slate-800 dark:text-white shadow-xl h-screen`}
		>
			<div>
				<Link
					to="/"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<LayoutDashboardIcon size={24} />
					{SideBarOpen && <span>Dashboard</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Dashboard
						</span>
					)}
				</Link>
				<Link
					to="/weather"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<ThermometerSunIcon size={24} />
					{SideBarOpen && <span>Weather</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Weather
						</span>
					)}
				</Link>
				<Link
					to="/calender"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<CalendarDaysIcon size={24} />
					{SideBarOpen && <span>Calender</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Calender
						</span>
					)}
				</Link>
				<Link
					to="/news"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<NewspaperIcon size={24} />
					{SideBarOpen && <span>News</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							News
						</span>
					)}
				</Link>
				<Link
					to="/quotes"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<QuoteIcon size={24} />
					{SideBarOpen && <span>Quotes</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Quotes
						</span>
					)}
				</Link>
				<Link
					to="/horoscope"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<Sparkles size={24} />
					{SideBarOpen && <span>Horoscope</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Horoscope
						</span>
					)}
				</Link>
				<Link
					to="/todoList"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<ListTodoIcon size={24} />
					{SideBarOpen && <span>Todo</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Todo
						</span>
					)}
				</Link>
				<Link
					to="/currency"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<CircleDollarSignIcon size={24} />
					{SideBarOpen && <span>Currency</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Currency
						</span>
					)}
				</Link>
				<Link
					to="/worldClock"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<Clock2Icon size={24} />
					{SideBarOpen && <span>Clock</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Clock
						</span>
					)}
				</Link>
				<Link
					to="/moodPlayer"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<MusicIcon size={24} />
					{SideBarOpen && <span>Music</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Music
						</span>
					)}
				</Link>
			</div>
			<div>
				<Link
					to="/about"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<BadgeInfoIcon size={24} />
					{SideBarOpen && <span>About</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							About
						</span>
					)}
				</Link>
				<Link
					to="/settings"
					className="group relative flex items-center gap-3 p-3 hover:text-blue-500"
				>
					<CogIcon size={24} />
					{SideBarOpen && <span>Settings</span>}
					{!SideBarOpen && (
						<span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Settings
						</span>
					)}
				</Link>
			</div>
		</div>
	);
};

export default SlideBar;
