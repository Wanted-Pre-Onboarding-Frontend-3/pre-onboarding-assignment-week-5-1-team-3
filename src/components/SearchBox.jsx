import { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { keywordState } from '../recoil/atom';

import { BiSearch } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
	SearchSection,
	ResultSection,
	SuggestionSection,
	RecentSearch,
	SearchBtn,
	ClearBtn,
	ResultList,
	SearchIcon,
	Results,
	DefaultKeyword,
} from '../styles/serach-box';

import { ARROW_DOWN, ARROW_UP, ESCAPE, ENTER } from './Search.constant';

const SearchResult = ({ result }) => {
	const [keyword, setKeyword] = useRecoilState(keywordState);

	const [isFocus, setIsFocus] = useState(false);
	const [movePage, setMovePage] = useState(false);
	const [resultIndex, setResultIndex] = useState(-1);
	const [recentSearch, setRecentSearch] = useState([]);

	const resultsRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = e => {
			if (isFocus && !resultsRef.current.contains(e.target)) setIsFocus(false);
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isFocus, resultsRef]);

	useEffect(() => {
		if (movePage) {
			setRecentSearch([...recentSearch, keyword]);
			setMovePage(false);
		}
	}, [movePage]);

	const getEnterResult = value => {
		setMovePage(true);
		setKeyword(value);
		alert('검색결과로 이동합니다');
	};

	const hancldKeywords = ({ target }) => getEnterResult(target.innerText);

	const handleSearchClick = () => getEnterResult(keyword);

	const resultCount = resultsRef.current?.childElementCount;
	const currentList = resultsRef.current?.children[resultIndex]?.innerText;
	const firstList = resultCount === resultIndex + 1;
	const lastList = resultIndex <= 0;

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
				<div onClick={hancldKeywords}>
					{recentSearch.map((item, i) => (
						// TODO : 클릭시 검색 input에 keyword 안들어감?
						<button key={item + i}>
							<BiSearch size="20" />
							{item}
						</button>
					))}
				</div>
			)}
		</RecentSearch>
	);

	const defaultKeywords = ['B형간염', '비만', '관절염', '우울', '식도염'];

	const keywordSuggestions = (
		<SuggestionSection>
			<p>추천 검색어로 검색해보세요</p>
			{defaultKeywords.map((item, i) => (
				<DefaultKeyword key={item + i} onClick={hancldKeywords}>
					{item}
				</DefaultKeyword>
			))}
		</SuggestionSection>
	);

	const searchResults = () => {
		const regex = new RegExp(keyword.split('').join('\\s*'), 'gi');

		return (
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
		);
	};

	const clearResultBtn = keyword && <AiFillCloseCircle size="22" color="#aaa" onClick={() => setKeyword('')} />;

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

					<ClearBtn>{clearResultBtn}</ClearBtn>

					<SearchBtn onClick={handleSearchClick}>
						<BiSearch size="28" />
					</SearchBtn>
				</label>
			</SearchSection>

			<ResultSection isFocus={() => setIsFocus(true)} isShow={isFocus}>
				{recentSearchKeyword}
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
