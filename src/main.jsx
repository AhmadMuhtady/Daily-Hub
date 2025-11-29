import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SideBarProvider } from './context/SideBarContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import { TodoProvider } from './context/TodoContext.jsx';
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<SideBarProvider>
					<SettingsProvider>
						<TodoProvider>
							<App />
						</TodoProvider>
					</SettingsProvider>
				</SideBarProvider>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>
);
