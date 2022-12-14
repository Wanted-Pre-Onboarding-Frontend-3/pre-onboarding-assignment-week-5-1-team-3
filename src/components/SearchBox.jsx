import { useRef, useState, useEffect } from 'react';

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
import { getRegexIgnoreWhitespaces } from '../utils/regex';

const SearchResult = ({ result, keyword, setKeyword }) => {
	const [isFocus, setIsFocus] = useState(false);
	const [movePage, setMovePage] = useState(false);
	const [resultIndex, setResultIndex] = useState(-1);
	const [recentSearch, setRecentSearch] = useState([]);
	const [isComposing, setIsComposing] = useState(false);

	const resultsRef = useRef(null);
	const resultSectionRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = e => {
			if (isFocus && !resultSectionRef.current.contains(e.target)) setIsFocus(false);
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isFocus, resultSectionRef]);

	useEffect(() => {
		if (movePage) {
			setRecentSearch([...recentSearch, keyword]);
			setMovePage(false);
		}
	}, [movePage]);

	const getEnterResult = value => {
		setMovePage(true);
		setKeyword(value);
		alert('검색결과 페이지로 이동합니다');
	};

	const handleKeywords = ({ target }) => getEnterResult(target.innerText);

	const resultCount = resultsRef.current?.childElementCount;
	const currentList = resultsRef.current?.children[resultIndex]?.innerText;
	const firstList = resultCount === resultIndex + 1;
	const lastList = resultIndex <= 0;

	const handleArrowKey = e => {
		if (isComposing) {
			return;
		}
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
				if (!currentList) setKeyword(keyword);
				break;

			default:
				break;
		}
	};

	const recentSearchKeyword = (
		<RecentSearch>
			<p>최근 검색어</p>
			<div>
				{recentSearch.length === 0 && <span>최근 검색어가 없습니다</span>}
				{recentSearch.length > 0 &&
					recentSearch?.map((item, i) => (
						<button key={item + i} onClick={({ target }) => getEnterResult(target.innerText)}>
							<BiSearch size="20" />
							{item}
						</button>
					))}
			</div>
		</RecentSearch>
	);

	const defaultKeywords = ['B형간염', '비만', '관절염', '우울', '식도염'];

	const keywordSuggestions = (
		<SuggestionSection>
			<p>추천 검색어로 검색해보세요</p>
			{defaultKeywords.map((item, i) => (
				<DefaultKeyword key={item + i} onClick={handleKeywords}>
					{item}
				</DefaultKeyword>
			))}
		</SuggestionSection>
	);

	const searchResults = () => {
		const regex = getRegexIgnoreWhitespaces(keyword);
		return (
			<>
				{result.map((item, i) => {
					const match = item.sickNm.match(regex)?.[0];
					return (
						<ResultList key={i} isFocus={resultIndex === i ? true : false}>
							<BiSearch size="20" />
							<button
								onClick={handleKeywords}
								dangerouslySetInnerHTML={{
									__html: item.sickNm.replace(regex, `<strong>${match}</strong>`),
								}}
							/>
						</ResultList>
					);
				})}
			</>
		);
	};

	const noResult = keyword && result.length === 0 && <p>검색어 없음</p>;

	return (
		<>
			<SearchSection>
				<label>
					<SearchIcon size="22" />

					<input
						type="search"
						onChange={({ target }) => setKeyword(target.value)}
						onKeyDown={handleArrowKey}
						onCompositionStart={() => setIsComposing(true)}
						onCompositionEnd={() => setIsComposing(false)}
						onFocus={() => setIsFocus(true)}
						value={keyword || ''}
						placeholder="질환명을 입력해주세요."
					/>

					<SearchBtn onClick={() => getEnterResult(keyword)}>
						<BiSearch size="28" />
					</SearchBtn>
				</label>
			</SearchSection>

			<ResultSection isShow={isFocus} ref={resultSectionRef}>
				{!keyword && recentSearchKeyword}

				{keyword && result && <p>추천 검색어</p>}

				<Results ref={resultsRef}>
					{keyword && result && searchResults()}
					{keyword === '' && keywordSuggestions}
					{noResult}
				</Results>
			</ResultSection>
		</>
	);
};

export default SearchResult;
