import SlideBar from './Sidebar';
import { useSideBar } from '../../context/SideBarContext';

const Layout = ({ children }) => {
	const { SideBarOpen } = useSideBar();
	return (
		<div className="flex">
			<SlideBar />
			<main
				className={`flex-1 flex flex-col ${
					SideBarOpen ? 'ml-[220px]' : 'ml-[70px]'
				} transition-all`}
			>
				<div>{children}</div>
			</main>
		</div>
	);
};

export default Layout;
