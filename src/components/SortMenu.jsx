const SortMenu = ({
  sort,
  sortChange,
  sortOption,
  langSort,
  langChange,
  langSortOption,
}) => {
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
