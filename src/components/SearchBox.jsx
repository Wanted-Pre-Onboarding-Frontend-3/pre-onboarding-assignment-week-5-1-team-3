import { useRecoilValue, useRecoilState } from 'recoil';
import { keywordState, isTouchedState, recentSearchState, resultIndexState, resultCountState } from '../recoil/atom';
import { ARROW_DOWN, ARROW_UP, ESCAPE } from './Search.constant';

import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
	const [isTouched, setIsTouched] = useRecoilState(isTouchedState);
	const [keyword, setKeyword] = useRecoilState(keywordState);
	const [resultIndex, setResultIndex] = useRecoilState(resultIndexState);
	const [recentSearch, setRecentSearch] = useRecoilState(recentSearchState);

	const resultCount = useRecoilValue(resultCountState);

	const handleSearch = e => {
		e.preventDefault();
		setRecentSearch([...recentSearch, keyword]);
		setKeyword('');
	};

	const handleArrowKey = e => {
		if (e.key === ARROW_DOWN) {
			if (resultCount === resultIndex + 1) {
				setResultIndex(0);
				return;
			}
			setResultIndex(prev => prev + 1);
		}
		if (e.key === ARROW_UP) {
			if (resultIndex <= 0) {
				setResultIndex(resultCount - 1);
				return;
			}
			setResultIndex(prev => prev - 1);
		}
		if (e.key === ESCAPE) {
			setKeyword('');
		}
	};

	return (
		<Form onSubmit={handleSearch}>
			<label htmlFor="">
				<Icon istouched={isTouched} size="22" />

				<input
					type="text"
					onChange={({ target }) => setKeyword(target.value)}
					onKeyDown={handleArrowKey}
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
