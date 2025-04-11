function ErrorMessage({ message }: { message: string }) {
	return (
		<p
			className='error'
			data-testid='error'
		>
			<span>🛑</span>
			{message}
		</p>
	);
}
export default ErrorMessage;
