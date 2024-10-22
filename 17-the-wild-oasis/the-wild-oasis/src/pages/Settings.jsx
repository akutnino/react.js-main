import Heading from '../components/common/Heading';
import Row from '../components/common/Row';
import UpdateSettingsForm from '../components/features/settings/UpdateSettingsForm';

function Settings() {
	return (
		<Row>
			<Heading as='h1'>Update hotel settings</Heading>
			<UpdateSettingsForm />
		</Row>
	);
}

export default Settings;
