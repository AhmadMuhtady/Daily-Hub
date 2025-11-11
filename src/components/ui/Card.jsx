const Card = ({ children, onClick, className = '', hover = false }) => {
	const baseClasses = 'bg-white dark:bg-slate-800 transition-all duration-300';
	const hoverClasses = 'hover:shadow-2xl hover:-translate-y-2';
	const cursorClass = onClick || hover ? 'cursor-pointer' : '';

	return (
		<div
			className={`rounded-2xl shadow-lg p-6 ${baseClasses} ${
				hover ? hoverClasses : ''
			} ${cursorClass} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
