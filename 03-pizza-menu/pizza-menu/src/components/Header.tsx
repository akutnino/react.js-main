function Header() {
	const styleSample = { color: 'red', fontSize: '48px' };

	return (
		<header
			className='header'
			data-testid='header'
		>
			<h1 style={styleSample}>Fast React Pizza Co.</h1>
		</header>
	);
}

export default Header;
