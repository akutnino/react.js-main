export default function Stats(props) {
	const { itemsArray } = props;
	const totalLength = itemsArray.length;
	const totalPackedItems = itemsArray.reduce(
		(acc, curr) => (curr.packed ? (acc += 1) : (acc += 0)),
		0
	);
	const packedItemsPercentage = Number(
		((totalPackedItems / totalLength) * 100).toFixed()
	);

	// prettier-ignore
	return (
		<footer className='stats'>
			<em>
				{totalLength === 0 ? `Start Packin` : null}
				{packedItemsPercentage === 100 ? `Let's Go!` : null}
				{totalLength > 0 && packedItemsPercentage < 100
					? `👜 You have ${totalLength} items on your list, and you already packed 
						${totalPackedItems} (${packedItemsPercentage ? packedItemsPercentage : 0}%)`
					: null}
			</em>
		</footer>
	);
}
