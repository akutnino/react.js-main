function PackingItem({
	description,
	quantity,
	packed,
}: {
	id: number;
	description: string;
	quantity: number;
	packed: boolean;
}) {
	return (
		<li>
			<span style={packed ? { textDecoration: 'line-through' } : {}}>
				{quantity} {description}
			</span>
			<button type='button'>❌</button>
		</li>
	);
}

export default PackingItem;
