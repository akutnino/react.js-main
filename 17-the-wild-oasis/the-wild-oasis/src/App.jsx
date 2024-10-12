import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './components/common/Button';
import Input from './components/common/Input';

const H1 = styled.h1`
	font-size: 60px;
	font-weight: 600;
`;

const StyledApp = styled.div`
	background-color: orangered;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<H1>The Wild Oasis</H1>
				<Button onClick={() => alert('Hello')}>Check In</Button>
				<Input
					type='number'
					placeholder='Number of guests'
				></Input>
			</StyledApp>
		</>
	);
}

export default App;
