import SlideBar from './Sidebar';
import Header from './Header';
import { useSideBar } from '../../context/SideBarContext';

const Layout = ({ children }) => {
	const { SideBarOpen } = useSideBar();
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex">
				<SlideBar />
				<main
					className={`flex-1 transition-all duration-200 ${
						SideBarOpen ? 'pl-[200px]' : 'pl-[60px]'
					}`}
				>
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
