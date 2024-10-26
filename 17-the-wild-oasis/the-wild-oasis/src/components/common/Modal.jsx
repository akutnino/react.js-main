import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Modal.propTypes = {
	children: PropTypes.node,
};

Window.propTypes = {
	name: PropTypes.string,
	children: PropTypes.node,
};

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal(props) {
	const { children } = props;
	const [openName, setOpenName] = useState('');
	const handleCloseWindow = () => setOpenName('');

	return (
		<ModalContext.Provider value={{ openName, setOpenName, handleCloseWindow }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open(props) {
	const { opens, children } = props;
	const { setOpenName } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => setOpenName(opens) });
}

function Window(props) {
	const { name, children } = props;
	const { openName, handleCloseWindow } = useContext(ModalContext);
	const { ref } = useOutsideClick(openName, handleCloseWindow);

	if (name !== openName) return null;
	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button
					type='button'
					onClick={handleCloseWindow}
				>
					<HiXMark />
				</Button>

				<div>
					{cloneElement(children, {
						isOpenModal: Boolean(openName),
						setIsOpenModal: handleCloseWindow,
					})}
				</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
