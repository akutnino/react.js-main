import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import Heading from './Heading';

ConfirmDelete.propTypes = {
	resourceName: PropTypes.string,
	onConfirm: PropTypes.func,
	setIsOpenModal: PropTypes.func,
	disabled: PropTypes.bool,
};

const StyledConfirmDelete = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function ConfirmDelete(props) {
	const { resourceName, onConfirm, disabled, setIsOpenModal: handleCloseWindow } = props;

	return (
		<StyledConfirmDelete>
			<Heading as='h3'>Delete {resourceName}</Heading>
			<p>
				Are you sure you want to delete this {resourceName} permanently? This action
				cannot be undone.
			</p>

			<div>
				<Button
					variation='secondary'
					disabled={disabled}
					onClick={handleCloseWindow}
				>
					Cancel
				</Button>

				<Button
					variation='danger'
					disabled={disabled}
					onClick={onConfirm}
				>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}

export default ConfirmDelete;
