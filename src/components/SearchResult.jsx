import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { keywordState, recentSearchState, resultIndexState, resultCountState } from '../recoil/atom';

import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useRef } from 'react';

const SearchResult = ({ result }) => {
	const recentSearch = useRecoilValue(recentSearchState);
	const resultIndex = useRecoilValue(resultIndexState);

	const [keyword, setKeyword] = useRecoilState(keywordState);

	const setResultCount = useSetRecoilState(resultCountState);

	// TODO: 사용자가 입력한 텍스트와 일치하는 부분 볼드처리
	const resultsRef = useRef(null);

	useEffect(() => {
		if (result.length > 0) {
			setResultCount(resultsRef.current.childElementCount);
		}
	}, [result.length]);

	const hancldKeywords = ({ target }) => setKeyword(target.innerText);

	const renderRecentSearch = (
		<RecentSearch isShow={!keyword}>
			<p>최근 검색어</p>
			{recentSearch.length > 0 && (
				<div>
					{recentSearch.map(item => (
						<button key={item} onClick={hancldKeywords}>
							<BiSearch size="20" />
							{item}
						</button>
					))}
				</div>
			)}
		</RecentSearch>
	);

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
			{result.map((item, i) => (
				<List key={item.sickNm} value={item.sickNm} isFocus={resultIndex === i ? true : false}>
					<BiSearch size="20" />
					<button onClick={hancldKeywords}>{item.sickNm}</button>
				</List>
			))}
		</>
	);

	const renderNoResult = keyword && result.length === 0 && <p>검색어 없음</p>;

	return (
		<Container>
			{renderRecentSearch}
			{keyword && result && <p>추천 검색어</p>}

			<Results ref={resultsRef}>
				{renderResult}

				{renderDefaultKeywords}

				{renderNoResult}
			</Results>
		</Container>
	);
};

const Container = styled.div`
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

const RecentSearch = styled.section`
	display: ${({ isShow }) => (isShow ? 'block' : 'none')};
	align-items: center;
	border-bottom: 1px solid #eee;

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

const List = styled.li`
	display: flex;
	align-items: center;
	padding: 8px;
	font-size: 1.1em;
	font-weight: bold;
	letter-spacing: -0.02em;
	background-color: ${({ isFocus }) => (isFocus ? '#eee' : 'white')};

	svg {
		color: #aaa;
		margin-right: 8px;
	}
`;

const Results = styled.ul`
	padding-bottom: 24px;
`;

const DefaultKeyword = styled.button`
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

export default SearchResult;
