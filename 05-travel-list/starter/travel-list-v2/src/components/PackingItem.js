export default function PackingItem(props) {
	const { itemObject, onClick, onPacked } = props;
	const { id, description, quantity, packed } = itemObject;
	const packedStyle = { textDecoration: 'line-through' };

	return (
		<li>
			<input
				type='checkbox'
				value={packed}
				onChange={onPacked(id)}
			/>
			<span style={packed ? packedStyle : {}}>
				{quantity} {description}
			</span>
			<button onClick={onClick(id)}>❌</button>
		</li>
	);
}
