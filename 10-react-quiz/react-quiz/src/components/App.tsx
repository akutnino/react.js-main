import Header from './Header.tsx';
import MainContent from './MainContent.tsx';

function App() {
	return (
		<div className='app'>
			<Header />

			<MainContent>
				<p>1/15</p>
				<p>Questions</p>
			</MainContent>
		</div>
	);
}

export default App;
