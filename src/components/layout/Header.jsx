import {
	Menu,
	Sun,
	Moon,
	XIcon,
	RadarIcon,
	BadgeInfoIcon,
	House,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSideBar } from '../../context/SideBarContext';
import { useTheme } from '../../context/ThemeContext';

import Button from '../ui/Button';

const Header = () => {
	const { SideBarOpen, toggleSideBar } = useSideBar();
	const { toggleTheme, theme } = useTheme();
	const { pathname } = useLocation();

	const getPageTitle = () => {
		if (pathname === '/') return 'Dashboard';
		const path = pathname.slice(1);
		return path.charAt(0).toUpperCase() + path.slice(1);
	};

	return (
		<header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700">
			<div className="flex justify-between items-center px-4 py-3">
				<div className="flex items-center gap-3 md:gap-5">
					<Button
						onClick={toggleSideBar}
						variant="secondary"
						size="sm"
						className="hover:scale-105 transition-transform"
					>
						{SideBarOpen ? <XIcon /> : <Menu />}
					</Button>

					<Link
						to="/"
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<RadarIcon className="text-red-500 dark:text-red-400" size={24} />

						<h1 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
							<span className="text-blue-500 dark:text-blue-400">Daily</span>
							<span className="text-orange-500 dark:text-orange-400">Hub</span>
							<span className="hidden sm:inline text-gray-400 dark:text-gray-500 mx-2">
								•
							</span>
							<span className="hidden sm:inline text-gray-600 dark:text-gray-400">
								{getPageTitle()}
							</span>
						</h1>
					</Link>
				</div>

				<nav className="flex items-center gap-2 md:gap-4">
					<Link
						to="/"
						className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200"
					>
						<House
							size={18}
							className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
						/>
						<span className="hidden sm:inline">Home</span>
					</Link>

					<Link
						to="/about"
						className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200"
					>
						<BadgeInfoIcon
							size={18}
							className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
						/>
						<span className="hidden sm:inline">About</span>
					</Link>

					<Button
						onClick={toggleTheme}
						variant="primary"
						size="sm"
						className="hover:scale-105 transition-transform"
						aria-label={
							theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
						}
					>
						{theme === 'dark' ? (
							<Sun size={20} className="text-yellow-400" />
						) : (
							<Moon size={20} className="text-slate-700" />
						)}
					</Button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
