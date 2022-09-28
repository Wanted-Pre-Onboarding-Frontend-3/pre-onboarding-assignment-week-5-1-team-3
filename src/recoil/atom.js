import { atom } from 'recoil';

export const keywordState = atom({
	key: 'keyword',
	default: '',
});

export const isTouchedState = atom({
	key: 'isTouched',
	default: false,
});
