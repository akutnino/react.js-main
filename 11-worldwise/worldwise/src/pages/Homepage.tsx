import { Link } from 'react-router';
import PageNav from '../components/PageNav.tsx';

function Homepage() {
	return (
		<div>
			<PageNav />

			<h1>Homepage</h1>

			<Link to={'/app'}>go to app</Link>
		</div>
	);
}

export default Homepage;
