import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './components/common/Button';
import Input from './components/common/Input';
import Heading from './components/common/Heading';

const StyledApp = styled.div`
	background-color: orangered;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading>The Wild Oasis</Heading>
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
