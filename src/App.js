import axios from 'axios';
import { useEffect, useState } from 'react';
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
			<header>
				<h1>질환을 검색해보세요</h1>
			</header>

			<SearchBox onSearchChange={setKeyword} keyword={keyword} />
			<SearchResult result={result} keyword={keyword} />
		</>
	);
}

export default App;
