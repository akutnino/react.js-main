import styles from '../styles/Message.module.scss';
import PropTypes from 'prop-types';

Message.propTypes = {
	message: PropTypes.string
};

export default function Message(props) {
	const { message } = props;

	return (
		<p className={styles.message}>
			<span role='img'>👋</span> {message}
		</p>
	);
}
