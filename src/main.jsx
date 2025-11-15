import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SideBarProvider } from './context/SideBarContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<SideBarProvider>
					<SettingsProvider>
						<App />
					</SettingsProvider>
				</SideBarProvider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
