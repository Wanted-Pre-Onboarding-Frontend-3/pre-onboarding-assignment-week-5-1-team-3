import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';

function App() {
	const [keyword, setKeyword] = useState('');
	const [result, setResult] = useState([]);

	// TODO: API 호출별로 로컬 캐싱 구현
	const fetchData = async () => {
		const { data } = await axios.get('http://localhost:4000/sick');
		return data;
	};

	const updateData = async () => {
		const result = await fetchData();
		const test = result.filter(list => list.sickNm.includes(keyword)).slice(0, 10);
		setResult(test);
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (keyword) updateData();
		}, 200);

		return () => clearTimeout(debounce);
	}, [keyword]);

	return (
		<>
			<Header>
				<p>국내 모든 임상시험 검색하고 온라인으로 참여하기</p>
			</Header>

			<SearchBox onSearchChange={setKeyword} keyword={keyword} />
			<SearchResult result={result} keyword={keyword} />
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
