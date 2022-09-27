import { atom } from 'recoil';

export const isTouchedState = atom({
	key: 'isTouched',
	default: false,
});
