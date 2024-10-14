import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './components/common/Button';
import Input from './components/common/Input';
import Heading from './components/common/Heading';
import Row from './components/common/Row';

const StyledApp = styled.div`
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row type='horizontal'>
					<Heading type='h1'>The Wild Oasis</Heading>

					<div>
						<Heading type='h2'>Check in and out</Heading>
						<Button
							type='button'
							onClick={() => alert('Hello')}
						>
							Check In
						</Button>
						<Button
							variation='secondary'
							size='large'
							type='button'
							onClick={() => alert('Hello')}
						>
							Check Out
						</Button>
					</div>
				</Row>

				<Row>
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
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
