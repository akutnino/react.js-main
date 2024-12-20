function Order({ closeHour }: { closeHour: number }) {
	return (
		<div className='order'>
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
