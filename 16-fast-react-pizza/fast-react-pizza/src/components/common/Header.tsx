import { Link } from 'react-router';
import SearchOrder from '../features/order/SearchOrder.tsx';

function Header() {
	return (
		<header>
			<Link to={'/'}>Fast React Pizza Co.</Link>
			<SearchOrder />
			<p>Nino Akut</p>
		</header>
	);
}

export default Header;
