import { useRecoilValue, useRecoilState } from 'recoil';
import { keywordState, isTouchedState, recentSearchState } from '../recoil/atom';

import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useRef } from 'react';

const SearchResult = ({ result }) => {
	const isTouched = useRecoilValue(isTouchedState);
	const recentSearch = useRecoilValue(recentSearchState);

	const [keyword, setKeyword] = useRecoilState(keywordState);

	// TODO: 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
	const resultsRef = useRef(null);

	const hancldKeywords = ({ target }) => setKeyword(target.innerText);

	const defaultKeywords = ['B형간염', '비만', '관절염', '우울', '식도염'];

	const renderDefaultKeywords = keyword === '' && (
		<>
			<p>추천 검색어로 검색해보세요</p>
			{defaultKeywords.map(item => (
				<DefaultKeyword key={item} onClick={hancldKeywords}>
					{item}
				</DefaultKeyword>
			))}
		</>
	);

	const renderResult = keyword && result && (
		<>
			<p>추천 검색어</p>
			{result.map((item, i) => (
				<List key={item.sickNm}>
					<BiSearch size="20" />
					<button onClick={hancldKeywords}>{item.sickNm}</button>
				</List>
			))}
		</>
	);

	const renderNoResult = keyword && result.length === 0 && <p>검색어 없음</p>;

	return (
		<Container istouched={isTouched}>
			<RecentSearch isShow={!keyword}>
				<p>최근 검색어</p>
				{recentSearch}
			</RecentSearch>

			<Results ref={resultsRef}>
				{renderDefaultKeywords}
				{renderResult}
			</Results>

			{renderNoResult}
		</Container>
	);
};

const Container = styled.div`
	display: ${({ istouched }) => (istouched ? 'block' : 'none')};
	width: 490px;
	background-color: white;
	margin-top: 8px;
	border-radius: 24px;
	box-shadow: 3px 3px 5px #c4c4c4ae;

	p {
		color: gray;
		font-weight: bold;
		font-size: 0.9em;
		margin-bottom: 18px;
	}
`;

const Results = styled.ul`
	padding: 24px;
`;

const RecentSearch = styled.ul`
	display: ${({ isShow }) => (isShow ? 'block' : 'none')};
	padding: 24px;
	border-bottom: 1px solid #eee;
`;

const List = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 12px;
	font-size: 1.1em;
	font-weight: bold;
	letter-spacing: -0.02em;

	svg {
		color: #aaa;
		margin-right: 8px;
	}
`;

const DefaultKeyword = styled.button`
	padding: 12px;
	background-color: #e2f4ff;
	color: #007be9;
	font-weight: bold;
	letter-spacing: -0.02em;
	margin-right: 8px;
	border-radius: 24px;
`;

export default SearchResult;
