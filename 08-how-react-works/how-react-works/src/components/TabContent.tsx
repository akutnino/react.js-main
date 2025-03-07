import { useState } from 'react';
import { type ContentItemType } from '../types/components/types.ts';

function TabContent({ item }: { item: ContentItemType }) {
	const [showDetails, setShowDetails] = useState<boolean>(true);
	const [likes, setLikes] = useState<number>(0);

	const handleIncrease = () => {
		setLikes(likes + 1);
	};

	const handleToggle = () => {
		setShowDetails((currentBoolean) => !currentBoolean);
	};

	const handleUndo = () => {
		setShowDetails(true);
		setLikes(0);
	};

	const handleTripleIncrease = () => {
		setLikes((currentLikes) => currentLikes + 1);
		setLikes((currentLikes) => currentLikes + 1);
		setLikes((currentLikes) => currentLikes + 1);
	};

	const handleUndoLater = () => {
		setTimeout(handleUndo, 2000);
	};

	return (
		<div
			className='tab-content'
			data-testid='tab-content'
		>
			<h4>{item.summary}</h4>
			{showDetails && <p>{item.details}</p>}

			<div className='tab-actions'>
				<button onClick={handleToggle}>{showDetails ? 'Hide' : 'Show'} details</button>

				<div className='hearts-counter'>
					<span data-testid='likes'>{likes} ❤️</span>
					<button onClick={handleIncrease}>+</button>
					<button onClick={handleTripleIncrease}>+++</button>
				</div>
			</div>

			<div className='tab-undo'>
				<button onClick={handleUndo}>Undo</button>
				<button onClick={handleUndoLater}>Undo in 2s</button>
			</div>
		</div>
	);
}

export default TabContent;
