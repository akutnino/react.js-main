import Button from '../../common/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../common/Modal';
import CabinTable from './CabinTable';

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens='cabin-form'>
				<Button>Add New Cabin</Button>
			</Modal.Open>

			<Modal.Window name='cabin-form'>
				<CreateCabinForm />
			</Modal.Window>

			<Modal.Open opens='table'>
				<Button>Show Table</Button>
			</Modal.Open>

			<Modal.Window name='table'>
				<CabinTable />
			</Modal.Window>
		</Modal>
	);
}

export default AddCabin;
