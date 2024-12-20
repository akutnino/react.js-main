import Header from './components/Header.tsx';
import Menu from './components/Menu.tsx';
import Footer from './components/Footer.tsx';
import './styles/main.css';

function App() {
	return (
		<div className='container'>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

export default App;
