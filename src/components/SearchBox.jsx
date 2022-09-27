const SearchBox = ({ onSearchChange, keyword }) => {
	const handleSearch = e => {
		e.preventDefault();
		alert('검색 결과로 이동합니다.');
	};

	return (
		<form onSubmit={handleSearch}>
			<input
				type="text"
				onChange={({ target }) => onSearchChange(target.value)}
				value={keyword}
				placeholder="질환명을 입력해주세요."
			/>
			<button>검색</button>
		</form>
	);
};

export default SearchBox;
