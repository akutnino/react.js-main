import Heading from '../components/common/Heading';
import Row from '../components/common/Row';

function Account() {
	return (
		<>
			<Heading as='h1'>Update your account</Heading>

			<Row>
				<Heading as='h3'>Update user data</Heading>
				<p>Update user data form</p>
			</Row>

			<Row>
				<Heading as='h3'>Update password</Heading>
				<p>Update user password form</p>
			</Row>
		</>
	);
}

export default Account;
