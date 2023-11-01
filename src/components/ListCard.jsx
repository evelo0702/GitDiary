const ListCard = ({ item }) => {
  const dateKor = `${new Date(item.date).getFullYear()}년 ${
    new Date(item.date).getMonth() + 1
  }월 ${new Date(item.date).getDate()}일`;
  return (
    <div className="mx-2 flex-col flex-wrap w-2/5 h-1/4 my-2 border border-black rounded-md">
      <div className="h-1/2 p-2">
        {item.lang !== "none" && (
          <img
            className="object-contain h-full w-full"
            src={import.meta.env.BASE_URL + `src/assets/${item.lang}.png`}
            alt=""
          />
        )}
      </div>
      <div className="h-1/2 text-center">
        <div className="">
          {item.title.length < 7 ? item.title : item.title.slice(0, 6) + "..."}
        </div>
        <p className="text-2xl flex justify-center items-center">
          {dateKor}
          {item.link !== "" && (
            <img
              className="object-contain h-4 w-4 ms-1 mb-1"
              src={import.meta.env.BASE_URL + `src/assets/github.png`}
              alt=""
            />
          )}
        </p>
      </div>
    </div>
  );
};
ListCard.defaultProps = {
  lang: "none",
};
export default ListCard;
