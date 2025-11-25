import { RingLoader } from 'react-spinners';
import { useTheme } from '../../context/ThemeContext';

const Spinner = ({
	size = 80,
	className = '',
	color,
	loading = true,
	fullScreen = false,
}) => {
	const { theme } = useTheme();

	const spinnerColor = color || (theme === 'dark' ? '#60a5fa' : '#3b82f6');

	const cssOverride = {
		display: 'block',
		margin: '0 auto',
	};

	if (!loading) return null;

	const spinnerContent = (
		<RingLoader
			size={size}
			color={spinnerColor}
			cssOverride={cssOverride}
			aria-label="Loading..."
			loading={loading}
		/>
	);

	if (fullScreen) {
		return (
			<div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
				<div className="flex flex-col items-center gap-4">
					{spinnerContent}
					<p className="text-gray-600 dark:text-gray-400 text-sm animate-pulse">
						Loading...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={`flex items-center justify-center p-8 ${className}`}>
			{spinnerContent}
		</div>
	);
};

export default Spinner;
