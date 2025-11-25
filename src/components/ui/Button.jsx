const Button = ({
	children,
	Icon,
	onClick,
	disabled = false,
	IconClassName,
	iconSize = 20,
	variant = 'primary',
	size = 'md',
	className = '',
}) => {
	const variants = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary:
			'bg-transparent text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700',
		danger: 'bg-red-600 text-white hover:bg-red-700',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg',
	};

	return (
		<button
			onClick={disabled ? undefined : onClick}
			className={`rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 ${
				variants[variant]
			} ${sizes[size]} ${
				disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
			} `}
		>
			{Icon && <Icon className={IconClassName} size={iconSize} />} {children}
		</button>
	);
};

export default Button;
