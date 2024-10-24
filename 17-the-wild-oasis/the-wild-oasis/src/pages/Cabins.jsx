import Heading from '../components/common/Heading';
import Row from '../components/common/Row';
import AddCabin from '../components/features/cabins/AddCabin';
import CabinTable from '../components/features/cabins/CabinTable';

function Cabins() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>

			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;
