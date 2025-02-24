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

	return (
		<div className='tab-content'>
			<h4>{item.summary}</h4>
			{showDetails && <p>{item.details}</p>}

			<div className='tab-actions'>
				<button onClick={handleToggle}>{showDetails ? 'Hide' : 'Show'} details</button>

				<div className='hearts-counter'>
					<span>{likes} ❤️</span>
					<button onClick={handleIncrease}>+</button>
					<button>+++</button>
				</div>
			</div>

			<div className='tab-undo'>
				<button>Undo</button>
				<button>Undo in 2s</button>
			</div>
		</div>
	);
}

export default TabContent;
