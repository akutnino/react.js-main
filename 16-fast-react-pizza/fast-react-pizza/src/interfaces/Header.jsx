import { Link } from 'react-router-dom';
import SearchOrder from '../components/order/SearchOrder';

function Header() {
	return (
		<header>
			<Link to={'/'}>Fast React Pizza Co.</Link>
			<SearchOrder />
			<p>Nino</p>
		</header>
	);
}

export default Header;
