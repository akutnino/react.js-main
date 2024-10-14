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
				<Heading type='h1'>The Wild Oasis</Heading>
				<Heading type='h2'>Check in and out</Heading>
				<Button
					type='button'
					onClick={() => alert('Hello')}
				>
					Check In
				</Button>
				<Heading
					as='p'
					type='h3'
				>
					Check in and out
				</Heading>
				<Input
					type='number'
					placeholder='Number of guests'
				></Input>
			</StyledApp>
		</>
	);
}

export default App;
