import { useRecoilState } from 'recoil';
import { isTouchedState } from '../recoil/atom';

import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const SearchBox = ({ onSearchChange, keyword }) => {
	const [isTouched, setIsTouched] = useRecoilState(isTouchedState);

	const handleFocus = () => setIsTouched(true);
	const handleBlur = () => setIsTouched(false);

	const handleSearch = e => {
		e.preventDefault();
		alert('검색 결과로 이동합니다.');
	};

	return (
		<Form onSubmit={handleSearch}>
			<label htmlFor="">
				<Icon isTouched={isTouched} size="22" />

				<input
					type="text"
					onChange={({ target }) => onSearchChange(target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					value={keyword}
					placeholder="질환명을 입력해주세요."
				/>

				<SearchBtn>
					<BiSearch size="28" />
				</SearchBtn>
			</label>
		</Form>
	);
};

const Form = styled.form`
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
			line-height: 1.6;

			&::placeholder {
				font-size: 1.3em;
				font-weight: bold;
				color: #aaa;
				letter-spacing: -0.02em;
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

const Icon = styled(BiSearch)`
	display: ${({ isTouched }) => (isTouched ? 'none' : 'block')};
	color: #aaa;
	position: absolute;
	left: 20px;
`;

const SearchBtn = styled.button`
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

export default SearchBox;
