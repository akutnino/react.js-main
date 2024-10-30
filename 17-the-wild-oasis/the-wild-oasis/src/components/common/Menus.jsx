import { createContext, useContext, useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useOutsideClick } from '../../hooks/useOutsideClick';

Menus.propTypes = {
	children: PropTypes.node,
};

Toggle.propTypes = {
	id: PropTypes.number,
};

List.propTypes = {
	id: PropTypes.number,
	children: PropTypes.node,
};

Button.propTypes = {
	icon: PropTypes.node,
	children: PropTypes.node,
	onClick: PropTypes.func,
};

const StyledMenu = styled.div`
	position: relative;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: absolute;
	z-index: 1;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

const MenusContext = createContext();

function Menus(props) {
	const { children } = props;
	const [openID, setOpenID] = useState('');
	const [position, setPosition] = useState(null);

	return (
		<MenusContext.Provider value={{ openID, setOpenID, position, setPosition }}>
			<StyledMenu>{children}</StyledMenu>
		</MenusContext.Provider>
	);
}

function Toggle(props) {
	const { id } = props;
	const { openID, setOpenID, setPosition } = useContext(MenusContext);

	const handleClick = (event) => {
		const rectangle = event.target.closest('button').getBoundingClientRect();

		setPosition({ x: 0, y: rectangle.height });
		openID === '' || openID !== id ? setOpenID(id) : setOpenID('');
	};

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List(props) {
	const { id, children } = props;
	const { openID, position, setOpenID } = useContext(MenusContext);
	const { ref } = useOutsideClick(id, () => setOpenID(''));

	if (openID !== id) return null;
	return (
		<StyledList
			position={position}
			ref={ref}
		>
			{children}
		</StyledList>
	);
}

function Button(props) {
	const { icon, children, onClick = () => {} } = props;
	const { setOpenID } = useContext(MenusContext);

	const handleClick = () => {
		onClick?.();
		setOpenID('');
	};

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
}

Menus.Menu = Menus;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
