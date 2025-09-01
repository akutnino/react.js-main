import styles from '../styles/components/Message.module.scss';

function Message({ message }: { message: string }) {
	return (
		<p className={styles.message}>
			<span role='img'>👋</span> {message}
		</p>
	);
}

export default Message;
