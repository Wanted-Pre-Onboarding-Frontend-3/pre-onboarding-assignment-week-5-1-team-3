export const getRegexIgnoreWhitespaces = keyword =>
	new RegExp(keyword.replaceAll(/\s*/g, '').split('').join('\\s*'), 'gi');
