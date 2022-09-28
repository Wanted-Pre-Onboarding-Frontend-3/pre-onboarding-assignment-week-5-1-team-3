import axiosInstance from './api';
import { useEffect, useState } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';
import { keywordState, isFocusState } from './recoil/atom';

import styled from 'styled-components';
import SearchBox from './components/SearchBox';

const App = () => {
	const keyword = useRecoilValue(keywordState);

	const [results, setResults] = useState([]);

	const getResults = async () => {
		const { data } = await axiosInstance.get('/sick', { cache: true });
		console.info('calling api'); // ?
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

			<SearchBox result={results} />
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
