const setSessionStorage = (key, value) => {
	sessionStorage.setItem(key, value);
};

const getSessionStorage = key => {
	return sessionStorage.getItem(key);
};

export const storageSession = {
	setSessionStorage,
	getSessionStorage,
};
