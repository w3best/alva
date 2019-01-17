import * as React from 'react';
import styled from 'styled-components';
import { Color } from '../colors';
import { Headline } from '../headline';
import { Copy, CopySize } from '../copy';
import { getSpace, SpaceSize, Space } from '../space';
import { PatternLibraryState } from '../../types';

export interface LibraryBoxProps {
	color?: string;
	textColor?: string;
	image?: string;
	name?: string;
	description?: string;
	install?: React.ReactNode;
	version?: string;
	state: PatternLibraryState;
}

const StyledBox =
	styled.div <
	LibraryBoxProps >
	`
	width: 360px;
	background: ${props => (props.color ? props.color : Color.Grey50)};
	border-radius: 6px;
	box-shadow: 0 0 24px 0 ${Color.BlackAlpha15};
	color: ${props => (props.textColor ? props.textColor : Color.White)};
	text-align: left;
	margin: ${getSpace(SpaceSize.S)}px ${getSpace(SpaceSize.XS)}px;
	user-select: none;
	transition: box-shadow 0.2s;
`;

const StyledImage = styled.div`
	height: 100px;
	width: 100%;
	background-image: url('${(props: LibraryBoxProps) => props.image}');
	background-size: cover;
	background-position: center;
	border-radius: 6px 6px 0 0;
`;

const StyledDetails = styled.div`
	min-height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
`;

const TranslucentCopy = styled(Copy)`
	opacity: 0.75;
`;

const StyledInstallContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const StyledTop = styled.div`
	padding: ${getSpace(SpaceSize.L)}px ${getSpace(SpaceSize.XL)}px 0;
`;

const Spinner = styled.div`
	width: 28px;
	height: 28px;
	border: 1.5px solid ${Color.White};
	border-right-color: transparent;
	border-radius: 50%;
	animation: load 1s infinite ease;
	box-sizing: border-box;

	@keyframes load {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const Loader = styled.div`
	width: 100%;
	height: 2px;
	overflow: hidden;
	position: absolute;
	left: 0;
	top: 0;

	&:after {
		content: '';
		display: block;
		width: 20px;
		height: 100%;
		background: ${(props: LibraryBoxProps) => props.textColor};
		animation: load2 1.5s infinite ease;
		transform: scaleX(1);
		transform-origin: 0 0;
	}

	@keyframes load2 {
		0% {
			margin-left: -20px;
		}
		50% {
			transform: scaleX(5);
		}
		100% {
			margin-left: 100%;
		}
	}
`;

const StyledBottom = styled.div`
	position: relative;
	padding: 0 ${getSpace(SpaceSize.XL)}px;
	border-radius: 0 0 6px 6px;
`;

export const LibraryBox: React.StatelessComponent<LibraryBoxProps> = (props): JSX.Element => (
	<StyledBox {...props}>
		{props.image && <StyledImage state={props.state} image={props.image} />}
		<StyledDetails {...props}>
			<StyledTop>
				<Headline order={4}>{props.name}</Headline>
				<Space sizeBottom={SpaceSize.XS} />
				<TranslucentCopy size={CopySize.M}>{props.description}</TranslucentCopy>
				<Space sizeBottom={SpaceSize.S} />
			</StyledTop>

			<StyledBottom {...props}>
				{props.state === PatternLibraryState.Connecting && <Loader {...props} />}
				<Space sizeTop={SpaceSize.L} />
				<StyledInstallContainer>
					{props.install}
					<TranslucentCopy>{props.version}</TranslucentCopy>
				</StyledInstallContainer>
				<Space sizeBottom={SpaceSize.L} />
			</StyledBottom>
		</StyledDetails>
	</StyledBox>
);
