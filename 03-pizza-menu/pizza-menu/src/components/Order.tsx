export type OrderType = { closeHour: number };

function Order({ closeHour }: OrderType) {
	return (
		<div
			className='order'
			data-testid='order'
		>
			<p>We're open until {closeHour}:00. Come visit us tomorrow.</p>
			<button
				type='button'
				className='btn'
			>
				Order
			</button>
		</div>
	);
}

export default Order;
