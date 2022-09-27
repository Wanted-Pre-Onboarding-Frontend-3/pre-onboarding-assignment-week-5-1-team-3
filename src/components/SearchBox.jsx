import { useSetRecoilState } from 'recoil';
import { isTouchedState } from '../recoil/atom';

import styled from 'styled-components';

const SearchBox = ({ onSearchChange, keyword }) => {
	const setIsTouched = useSetRecoilState(isTouchedState);

	const handleFocus = () => setIsTouched(true);
	const handleBlur = () => setIsTouched(false);

	const handleSearch = e => {
		e.preventDefault();
		alert('검색 결과로 이동합니다.');
	};

	return (
		<Form onSubmit={handleSearch}>
			<input
				type="text"
				onChange={({ target }) => onSearchChange(target.value)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={keyword}
				placeholder="질환명을 입력해주세요."
			/>
			<button>검색</button>
		</Form>
	);
};

const Form = styled.form``;

export default SearchBox;
