import { useEffect } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../components/common/Heading';
import Row from '../components/common/Row';

function Cabins() {
	useEffect(() => {
		const fetchCabins = async () => {
			try {
				const data = await getCabins();
				if (!data) throw new Error('Fetch Request Failed');

				console.log(data);
			} catch (error) {
				console.log({ error });
			}
		};

		fetchCabins();
		return () => {};
	}, []);

	return (
		<Row type='horizontal'>
			<Heading as='h1'>All cabins</Heading>
			<p>TEST</p>
		</Row>
	);
}

export default Cabins;
