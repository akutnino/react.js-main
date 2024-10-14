import styled, { css } from 'styled-components';

const test = css`
	text-align: center;
`;

const Heading = styled.h1`
	font-size: 60px;
	font-weight: 600;
	background-color: yellow;
	${test}
`;

export default Heading;
