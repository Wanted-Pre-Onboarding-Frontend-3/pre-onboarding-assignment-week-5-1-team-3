import { atom } from 'recoil';

export const keywordState = atom({
	key: 'keyword',
	default: '',
});

export const isTouchedState = atom({
	key: 'isTouched',
	default: false,
});

export const isResultOpenState = atom({
	key: 'isResultOpen',
	default: false,
});

export const recentSearchState = atom({
	key: 'recentSearch',
	default: [],
});

export const resultIndexState = atom({
	key: 'resultIndex',
	default: -1,
});

export const resultCountState = atom({
	key: 'resultCount',
	default: 0,
});
