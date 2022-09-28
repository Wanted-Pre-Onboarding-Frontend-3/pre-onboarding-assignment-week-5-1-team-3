import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export const SearchSection = styled.section`
	label {
		width: 490px;
		height: 74px;
		position: relative;
		display: flex;
		align-items: center;

		input {
			width: inherit;
			height: inherit;
			background-color: white;
			padding: 20px 10px 20px 30px;
			border-radius: 42px;
			border: 2px solid;
			border-color: white;
			text-indent: 16px;
			caret-color: #007be9;
			font-size: 1.3em;
			font-weight: bold;
			letter-spacing: -0.02em;
			line-height: 1.6;

			&::placeholder {
				color: #aaa;
			}

			&:focus {
				border: 2px solid #007be9;

				&::placeholder {
					color: transparent;
				}
			}
		}
	}
`;

export const SearchIcon = styled(BiSearch)`
	color: #aaa;
	position: absolute;
	left: 20px;
`;

export const SearchBtn = styled.button`
	position: absolute;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	right: 10px;
	border-radius: 50%;
	background-color: #007be9;
	color: white;
`;

export const ClearBtn = styled.button`
	position: absolute;
	right: 70px;
`;

export const ResultSection = styled.section`
	display: ${({ isShow }) => (isShow ? 'block' : 'none')};
	width: 490px;
	background-color: white;
	margin-top: 8px;
	border-radius: 24px;
	box-shadow: 3px 3px 5px #c4c4c4ae;

	p {
		padding: 24px 0 0 20px;
		color: gray;
		font-weight: bold;
		font-size: 0.9em;
		margin-bottom: 18px;
	}
`;

export const SuggestionSection = styled.section`
	border-top: 1px solid #eee;
`;

export const RecentSearch = styled.section`
	display: ${({ isShow }) => (isShow ? 'block' : 'none')};
	align-items: center;

	div {
		button {
			width: 100%;
			padding: 10px 20px;
			display: flex;
			align-items: center;
			font-size: 1.1em;
			font-weight: bold;

			&:last-child {
				margin-bottom: 12px;
			}
			&:hover {
				background-color: #eee;
			}
			svg {
				color: #aaa;
				margin-right: 8px;
			}
		}
	}
`;

export const ResultList = styled.li`
	display: flex;
	align-items: center;
	padding: 8px 20px;
	font-size: 1.1em;
	letter-spacing: -0.02em;
	background-color: ${({ isFocus }) => (isFocus ? '#eee' : 'white')};

	&:hover {
		background-color: #eee;
	}
	svg {
		color: #aaa;
		margin-right: 8px;
	}
	button {
		text-align: left;
		width: 100%;
	}
`;

export const Results = styled.ul`
	padding-bottom: 24px;

	li {
		&:hover {
			background-color: #eee;
		}
	}
`;

export const DefaultKeyword = styled.button`
	padding: 12px;
	background-color: #e2f4ff;
	color: #007be9;
	font-weight: bold;
	letter-spacing: -0.02em;
	margin-right: 8px;
	border-radius: 24px;

	&:first-of-type {
		margin-left: 20px;
	}
`;
