import { type Dispatch } from 'react';

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

export default Tab;
