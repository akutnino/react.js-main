// renamed Error to ErrorMessage to avoid name clash with ErrorConstructor instance.
function ErrorMessage() {
	return (
		<p className='error'>
			<span>💥</span> There was an error fecthing questions.
		</p>
	);
}

export default ErrorMessage;
