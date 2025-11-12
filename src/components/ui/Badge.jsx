const Badge = ({ children, variant = 'info', className = '' }) => {
	const variants = {
		success:
			'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
		warning:
			'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
		danger: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
		info: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
	};

	return (
		<span className={`base-classes ${variants[variant]} ${className}`}>
			{children}
		</span>
	);
};
