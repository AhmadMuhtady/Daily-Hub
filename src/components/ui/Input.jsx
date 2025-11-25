const Input = ({
	type,
	placeholder,
	className,
	label,
	onChange,
	error,
	value,
	...props
}) => {
	return (
		<div>
			{label && (
				<label className="block mb-2 font-medium text-sm">{label}</label>
			)}
			<input
				type={type}
				placeholder={placeholder}
				className={`${className} w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
					error ? 'border-red-500' : ''
				}`}
				onChange={onChange}
				value={value}
				{...props}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Input;
