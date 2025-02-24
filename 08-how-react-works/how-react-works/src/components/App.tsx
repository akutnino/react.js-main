import { type Dispatch, useState } from 'react';
import { type ContentType } from '../types/components/types.ts';

const content: ContentType = [
	{
		summary: 'React is a library for building UIs',
		details:
			'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		summary: 'State management is like giving state a home',
		details:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		summary: 'We can think of props as the component API',
		details:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
	},
];

export default function App() {
	return (
		<div>
			<Tabbed content={content} />
		</div>
	);
}

function Tabbed({ content }: { content: ContentType }) {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<div className='tabs'>
				<Tab
					num={0}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<Tab
					num={1}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<Tab
					num={2}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<Tab
					num={3}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>

			{activeTab <= 2 ? (
				<TabContent item={content.at(activeTab)!} />
			) : (
				<DifferentContent />
			)}
		</div>
	);
}

function Tab({
	num,
	activeTab,
	setActiveTab,
}: {
	num: number;
	activeTab: number;
	setActiveTab: Dispatch<React.SetStateAction<number>>;
}) {
	const handleClick = () => {
		setActiveTab(num);
	};

	return (
		<button
			className={activeTab === num ? 'tab active' : 'tab'}
			onClick={handleClick}
		>
			Tab {num + 1}
		</button>
	);
}

function TabContent({ item }: { item: { summary: string; details: string } }) {
	const [showDetails, setShowDetails] = useState(true);
	const [likes, setLikes] = useState(0);

	const handleIncrease = () => {
		setLikes(likes + 1);
	};

	const handleToggle = () => {
		setShowDetails((currentState) => !currentState);
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

function DifferentContent() {
	return (
		<div className='tab-content'>
			<h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
		</div>
	);
}
