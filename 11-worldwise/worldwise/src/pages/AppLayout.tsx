import AppNav from '../components/AppNav.tsx';
import PageNav from '../components/PageNav.tsx';

function AppLayout() {
	return (
		<div>
			<PageNav />
			<AppNav />

			<h1>AppLayout</h1>
		</div>
	);
}

export default AppLayout;
