import { useState } from 'react';

const content = [
	{
		summary: 'React is a library for building UIs',
		details:
			'Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		summary: 'State management is like giving state a home',
		details:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		summary: 'We can think of props as the component API',
		details:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
	}
];

export default function App() {
	return (
		<div>
			<Tabbed content={content} />
		</div>
	);
}

function Tabbed(props) {
	const { content } = props;
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<div className='tabs'>
				{content.map((element, index) => (
					<Tab
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						num={index}
						key={index}
					/>
				))}
				<Tab
					num={3}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>

			{activeTab <= 2 ? (
				<TabContent
					contentItemObject={content.at(activeTab)}
					key={content.at(activeTab).summary}
				/>
			) : (
				<DifferentContent />
			)}
		</div>
	);
}

function Tab(props) {
	const { num, activeTab, setActiveTab } = props;

	const handleTabClick = () => {
		setActiveTab(num);
	};

	return (
		<button
			className={activeTab === num ? 'tab active' : 'tab'}
			onClick={handleTabClick}
		>
			Tab {num + 1}
		</button>
	);
}

function TabContent(props) {
	const { contentItemObject } = props;
	const [showDetails, setShowDetails] = useState(true);
	const [likes, setLikes] = useState(0);

	const handleDetailsVisibility = () => {
		setShowDetails((currentState) => !currentState);
	};

	const handleInc = () => {
		setLikes(likes + 1);
	};

	const handleTripleInc = () => {
		setLikes((currentState) => currentState + 3);
	};

	const handleUndo = () => {
		setShowDetails(true);
		setLikes(Number(0));
	};

	const handleUndoLater = () => {
		setTimeout(handleUndo, 2000);
	};

	return (
		<div className='tab-content'>
			<h4>{contentItemObject.summary}</h4>
			{showDetails && <p>{contentItemObject.details}</p>}

			<div className='tab-actions'>
				<button onClick={handleDetailsVisibility}>
					{showDetails ? 'Hide' : 'Show'} Details
				</button>

				<div className='hearts-counter'>
					<span>{likes} ❤️</span>
					<button onClick={handleInc}>+</button>
					<button onClick={handleTripleInc}>+++</button>
				</div>
			</div>

			<div className='tab-undo'>
				<button onClick={handleUndo}>Undo</button>
				<button onClick={handleUndoLater}>Undo in 2s</button>
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
