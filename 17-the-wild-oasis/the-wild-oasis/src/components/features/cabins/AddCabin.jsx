import Button from '../../common/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../common/Modal';

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='cabin-form'>
					<Button>Add New Cabin</Button>
				</Modal.Open>

				<Modal.Window name='cabin-form'>
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCabin;
