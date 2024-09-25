import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

LinkButton.propTypes = {
	children: PropTypes.node,
	to: PropTypes.string,
};

function LinkButton(props) {
	const { children, to } = props;
	const navigate = useNavigate();
	const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			{to === '-1' && (
				<button
					className={className}
					onClick={handleBack}
				>
					{children}
				</button>
			)}

			{to !== '-1' && (
				<Link
					to={to}
					className={className}
				>
					{children}
				</Link>
			)}
		</>
	);
}

export default LinkButton;
