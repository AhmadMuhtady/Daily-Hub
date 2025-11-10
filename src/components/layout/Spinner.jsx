import { RingLoader } from 'react-spinners';

const cssOverride = {
	display: 'block',
	margin: '0 auto 50px auto',
};

const Spinner = ({ size, className }) => {
	return (
		<div>
			<RingLoader
				size={size}
				className={className}
				cssOverride={cssOverride}
				aria-label="Lauding ..."
			/>
		</div>
	);
};

export default Spinner;
