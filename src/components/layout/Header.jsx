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
		const path = pathname.slice(1); // Remove /
		return path.charAt(0).toUpperCase() + path.slice(1); // Capitalize
	};

	return (
		<header className="bg-white dark:bg-slate-800 shadow-md p-2 sticky top-0 z-50">
			<div className="flex justify-between items-center ">
				<div className="flex justify-center items-center gap-5">
					<Button onClick={toggleSideBar} variant="secondary" size="sm">
						{SideBarOpen ? <XIcon /> : <Menu />}
					</Button>

					<Link
						to="/"
						className="flex justify-center items-center gap-2 text-blue-400"
					>
						<RadarIcon className="text-red-500" />
						<h1>
							Daily<span className="text-orange-300">Hub</span> •{' '}
							{getPageTitle()}
						</h1>
					</Link>
				</div>
				<div className="flex justify-center items-center gap-5 mr-3">
					<Link
						to="/"
						className="group inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-300 transition"
					>
						<House
							size={18}
							className="opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
						/>
						<span className="">Home</span>
					</Link>

					<Link
						to="/about"
						className="group inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-300 transition "
					>
						<BadgeInfoIcon
							size={18}
							className="opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
						/>
						<span className="">About</span>
					</Link>
					<Button onClick={toggleTheme} variant="primary" size="sm">
						{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
