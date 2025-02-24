import { useState } from 'react';
import { type ContentType } from '../types/components/types.ts';
import Tab from './Tab.tsx';
import TabContent from './TabContent.tsx';
import DifferentContent from './DifferentContent.tsx';

function Tabbed({ content }: { content: ContentType }) {
	const [activeTab, setActiveTab] = useState<number>(0);

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

export default Tabbed;
