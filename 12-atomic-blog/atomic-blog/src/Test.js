import { useState } from 'react';

function SlowComponent() {
	// If this is too slow on your maching, reduce the `length`
	const words = Array.from({ length: 10_000 }, () => 'WORD');
	return (
		<ul>
			{words.map((word, i) => (
				<li key={i}>
					{i}: {word}
				</li>
			))}
		</ul>
	);
}

function Counter(props) {
	const { children } = props;
	const [count, setCount] = useState(0);

	const handleCount = () => {
		setCount((currentCount) => currentCount + 1);
	};

	return (
		<div>
			<h1>Slow counter?!?</h1>
			<button onClick={handleCount}>Increase: {count}</button>
			{children}
		</div>
	);
}

export default function Test() {
	return (
		<Counter>
			<SlowComponent />
		</Counter>
	);
}
