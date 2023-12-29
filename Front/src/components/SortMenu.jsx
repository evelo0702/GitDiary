const SortMenu = ({
  sort,
  sortChange,
  sortOption,
  langSort,
  langChange,
  langSortOption,
}) => {
  // 최신순 오래된순 필터랑 언어필터 동시 적용 처리 필요 *****
  return (
    <>
      <select value={sort} onChange={(e) => sortChange(e.target.value)}>
        {sortOption.map((it, index) => (
          <option value={it.value} key={index}>
            {it.name}
          </option>
        ))}
      </select>
      <select value={langSort} onChange={(e) => langChange(e.target.value)}>
        {langSortOption.map((it, idx) => (
          <option value={it.value} key={idx}>
            {it.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SortMenu;
