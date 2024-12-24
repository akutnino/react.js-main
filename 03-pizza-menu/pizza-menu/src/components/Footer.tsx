import Order from './Order.tsx';

function Footer() {
	const hour: number = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;

	return (
		<footer
			className='footer'
			data-testid='footer'
		>
			{isOpen ? (
				<Order closeHour={closeHour} />
			) : (
				<p>
					We're happy to welcome you between {openHour}:00 to {closeHour}:00.
				</p>
			)}
		</footer>
	);
}

export default Footer;
