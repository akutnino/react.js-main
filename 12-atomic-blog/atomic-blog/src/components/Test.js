import { useState } from 'react';

function SlowComponent() {
	// If this is too slow on your maching, reduce the `length`
	const words = Array.from({ length: 100_000 }, () => 'WORD');
	return (
		<ul>
			{words.map((word, index) => (
				<li key={index}>
					{index}: {word}
				</li>
			))}
		</ul>
	);
}

export default function Test() {
	const [count, setCount] = useState(0);
	const handleClick = () => {
		setCount((currentState) => currentState + 1);
	};

	return (
		<div>
			<h1>Slow counter?!?</h1>
			<button onClick={handleClick}>Increase: {count}</button>
			<SlowComponent />
		</div>
	);
}
