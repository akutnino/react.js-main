function Loader() {
	return (
		<div
			className='loader-container'
			data-testid='loader'
		>
			<div className='loader'></div>
			<p>Loading questions...</p>
		</div>
	);
}

export default Loader;
