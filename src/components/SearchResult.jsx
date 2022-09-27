import { useRecoilValue } from 'recoil';
import { isTouchedState } from '../recoil/atom';

import styled from 'styled-components';

const SearchResult = ({ result, keyword }) => {
	const isTouched = useRecoilValue(isTouchedState);
	// TODO: 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
	// TODO: 키보드만으로 추천 검색어들로 이동 가능하도록 구현

	const renderResult = (
		<>
			<p>추천 검색어</p>
			{result.map(item => item.sickNm)}
		</>
	);

	const defaultKeywords = ['B형간염', '비만', '관절염', '우울증', '식도염'];
	const renderDefaultKeywords = (
		<>
			<p>추천 검색어로 검색해보세요</p>
			{defaultKeywords.map(item => item)}
		</>
	);

	return (
		<Container isTouched={isTouched}>
			<section>최근검색어</section>
			<section>
				{keyword === '' && renderDefaultKeywords}
				{keyword && result && renderResult}
			</section>
			{keyword && result.length === 0 && <p>검색어 없음</p>}
		</Container>
	);
};

const Container = styled.div`
	display: ${props => (props.isTouched ? 'block' : 'none')};
`;

export default SearchResult;
