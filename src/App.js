import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { keywordState } from './recoil/atom';

import styled from 'styled-components';

import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';

function App() {
	const keyword = useRecoilValue(keywordState);
	const [results, setResults] = useState([]);

	// TODO: API 호출별로 로컬 캐싱 구현
	const getResults = async () => {
		const { data } = await axios.get('http://localhost:4000/sick');
		return data;
	};

	const filterResults = async () => {
		const response = await getResults();
		const results = response.filter(list => list.sickNm.includes(keyword)).slice(0, 10);
		setResults(results);
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (keyword) filterResults();
		}, 200);

		return () => clearTimeout(debounce);
	}, [keyword]);

	return (
		<>
			<Header>
				<p>국내 모든 임상시험 검색하고 온라인으로 참여하기</p>
			</Header>

			<SearchBox />
			<SearchResult result={results} keyword={keyword} />
		</>
	);
}

const Header = styled.h1`
	width: 490px;
	text-align: center;
	word-break: keep-all;
	line-height: 1.6;
	margin-top: 180px;
	margin-bottom: 40px;
	font-size: 2.125em;
	font-weight: bold;
	letter-spacing: -0.02em;
`;

export default App;
