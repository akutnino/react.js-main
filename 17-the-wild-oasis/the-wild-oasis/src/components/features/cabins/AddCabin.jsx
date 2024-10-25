import { useState } from 'react';
import Button from '../../common/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../common/Modal';

function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleAddCabin = () => {
		setIsOpenModal((currentState) => !currentState);
	};

	return (
		<div>
			<Button onClick={handleAddCabin}>Add New Cabin</Button>

			{isOpenModal && (
				<Modal setIsOpenModal={setIsOpenModal}>
					<CreateCabinForm
						isOpenModal={isOpenModal}
						setIsOpenModal={setIsOpenModal}
					/>
				</Modal>
			)}
		</div>
	);
}

export default AddCabin;
