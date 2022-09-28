import axiosInstance from './api';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import SearchBox from './components/SearchBox';
import { getRegexIgnoreWhitespaces } from './utils/regex';
import { storageSession } from './utils/session-stroage';

const App = () => {
	const [keyword, setKeyword] = useState('');
	const [results, setResults] = useState([]);

	const getResults = async () => {
		const keywordTrim = keyword.split(' ').join('');

		if (storageSession.getSessionStorage(keywordTrim)) {
			return storageSession.getSessionStorage(keywordTrim);
		}

		const { data } = await axiosInstance.get('/sick', { cache: true });
		storageSession.setSessionStorage(keywordTrim, JSON.stringify(data));
		console.info('calling api'); // ?
		return data;
	};

	const filterResults = async () => {
		let response = await getResults();
		const keywordTrim = keyword.split(' ').join('');
		const keywordRegex = getRegexIgnoreWhitespaces(keyword);

		if (storageSession.getSessionStorage(keywordTrim)) {
			const sessionResult = await getResults();
			response = JSON.parse(sessionResult);
		}
		const results = response.filter(list => list.sickNm.search(keywordRegex) !== -1).slice(0, 10);
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

			<SearchBox result={results} keyword={keyword} setKeyword={setKeyword} />
		</>
	);
};

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
