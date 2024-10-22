import { useState } from 'react';
import { formatCurrency } from '../../../utils/helpers';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';

CabinRow.propTypes = {
	cabinObject: PropTypes.object,
};

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow(props) {
	const { cabinObject } = props;
	const {
		id: cabinID,
		image,
		name,
		regularPrice,
		discount,
		maxCapacity,
		description,
	} = cabinObject;

	const [showForm, setShowForm] = useState(false);
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { createCabin, isCreating } = useCreateCabin();

	const handleDuplicateCabin = () => {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			image,
			regularPrice,
			discount,
			description,
		});
	};

	const handleEditCabin = () => {
		setShowForm((currentState) => !currentState);
	};

	const handleDeleteCabin = () => {
		deleteCabin(cabinID);
	};

	return (
		<>
			<TableRow role='row'>
				<Img src={image} />
				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity} quests</div>
				<Price>{formatCurrency(regularPrice)}</Price>

				{Number(discount) > 0 && <Discount>{formatCurrency(discount)}</Discount>}
				{Number(discount) === 0 && <span>&mdash;</span>}

				<div>
					<button
						type='button'
						disabled={isCreating}
						onClick={handleDuplicateCabin}
					>
						<HiSquare2Stack />
					</button>
					<button
						type='button'
						onClick={handleEditCabin}
					>
						<HiPencil />
					</button>
					<button
						type='button'
						disabled={isDeleting}
						onClick={handleDeleteCabin}
					>
						<HiTrash />
					</button>
				</div>
			</TableRow>

			{showForm && <CreateCabinForm cabinToEdit={cabinObject} />}
		</>
	);
}

export default CabinRow;
