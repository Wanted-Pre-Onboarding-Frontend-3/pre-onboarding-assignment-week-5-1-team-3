import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { keywordState } from '../recoil/atom';

import { BiSearch } from 'react-icons/bi';
import {
	SearchSection,
	ResultSection,
	SuggestionSection,
	RecentSearch,
	SearchBtn,
	ResultList,
	SearchIcon,
	Results,
	DefaultKeyword,
} from '../styles/serach-box';

import { ARROW_DOWN, ARROW_UP, ESCAPE, ENTER } from './Search.constant';

const SearchResult = ({ result }) => {
	const [keyword, setKeyword] = useRecoilState(keywordState);

	const [isFocus, setIsFocus] = useState(false);
	const [resultIndex, setResultIndex] = useState(-1);
	const [recentSearch, setRecentSearch] = useState([]);

	const resultsRef = useRef(null);

	const resultCount = resultsRef.current?.childElementCount;
	const currentList = resultsRef.current?.children[resultIndex]?.innerText;
	const firstList = resultCount === resultIndex + 1;
	const lastList = resultIndex <= 0;

	const getEnterResult = value => {
		setKeyword(value);
		setRecentSearch([...recentSearch, keyword]); // 한박자 느림
		alert('검색결과로 이동합니다');
	};

	const hancldKeywords = ({ target }) => setKeyword(target.innerText);

	const handleSearchClick = () => getEnterResult(keyword);

	const handleArrowKey = e => {
		switch (e.key) {
			case ARROW_DOWN:
				setResultIndex(resultIndex + 1);
				if (firstList) setResultIndex(0);
				break;

			case ARROW_UP:
				setResultIndex(resultIndex - 1);
				if (lastList) setResultIndex(resultCount - 1);
				break;

			case ESCAPE:
				setKeyword('');
				break;

			case ENTER:
				setResultIndex(-1);
				getEnterResult(currentList);
				break;

			default:
				break;
		}
	};

	const recentSearchKeyword = (
		<RecentSearch isShow={!keyword}>
			<p>최근 검색어</p>
			{recentSearch.length > 0 && !keyword && (
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

	const keywordSuggestions = keyword === '' && (
		<SuggestionSection>
			<p>추천 검색어로 검색해보세요</p>
			{defaultKeywords.map(item => (
				<DefaultKeyword key={item} onClick={hancldKeywords}>
					{item}
				</DefaultKeyword>
			))}
		</SuggestionSection>
	);

	const searchResults = () => {
		const regex = new RegExp(keyword, 'g');

		return (
			keyword &&
			result && (
				<>
					{result.map((item, i) => (
						<ResultList key={i} isFocus={resultIndex === i ? true : false}>
							<BiSearch size="20" />
							<button
								onClick={hancldKeywords}
								dangerouslySetInnerHTML={{
									__html: item.sickNm.replace(regex, `<strong>${keyword}</strong>`),
								}}
							/>
						</ResultList>
					))}
				</>
			)
		);
	};

	const noResult = keyword && result.length === 0 && <p>검색어 없음</p>;

	return (
		<>
			<SearchSection>
				<label>
					<SearchIcon size="22" />

					<input
						type="text"
						onChange={({ target }) => setKeyword(target.value)}
						onKeyDown={handleArrowKey}
						onFocus={() => setIsFocus(true)}
						value={keyword || ''}
						placeholder="질환명을 입력해주세요."
					/>

					<SearchBtn onClick={handleSearchClick}>
						<BiSearch size="28" />
					</SearchBtn>
				</label>
			</SearchSection>

			<ResultSection isfocus={isFocus}>
				{recentSearchKeyword}
				{keyword && result && <p>추천 검색어</p>}

				<Results ref={resultsRef}>
					{searchResults()}
					{keywordSuggestions}
					{noResult}
				</Results>
			</ResultSection>
		</>
	);
};

export default SearchResult;
