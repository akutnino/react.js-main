import { useState } from 'react';
import Button from '../components/common/Button';
import Heading from '../components/common/Heading';
import Row from '../components/common/Row';
import CabinTable from '../components/features/cabins/CabinTable';
import CreateCabinForm from '../components/features/cabins/CreateCabinForm';

function Cabins() {
	const [showForm, setShowForm] = useState(false);

	const handleAddCabin = () => {
		setShowForm((currentState) => !currentState);
	};

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>

			<Row>
				<CabinTable />
				<Button onClick={handleAddCabin}>Add New Cabin</Button>
				{showForm && <CreateCabinForm />}
			</Row>
		</>
	);
}

export default Cabins;
