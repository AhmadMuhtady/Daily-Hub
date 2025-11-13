import { useState, useContext, createContext } from 'react';

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
	const [SideBarOpen, setSideBarOpen] = useState(false);

	const toggleSideBar = () => {
		setSideBarOpen(!SideBarOpen);
	};

	return (
		<SideBarContext.Provider value={{ SideBarOpen, toggleSideBar }}>
			{children}
		</SideBarContext.Provider>
	);
};

export const useSideBar = () => {
	return useContext(SideBarContext);
};
