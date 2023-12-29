import { Link } from "react-router-dom";

const ListCard = ({ item }) => {
  const dateKor = `${new Date(item.date).getFullYear()}년 ${
    new Date(item.date).getMonth() + 1
  }월 ${new Date(item.date).getDate()}일`;
  return (
    <Link to={`/detail/${item.id}`} className="p-4 max-h-[30vh]">
      <div className="flex-col h-4/5 flex-wrap border border-black rounded-md">
        <div className="h-1/4 p-1 my-4">
          {item.lang !== "none" && (
            <img
              className="object-contain h-full w-full"
              src={import.meta.env.BASE_URL + `src/assets/${item.lang}.png`}
              alt=""
            />
          )}
        </div>
        <div className="h-1/2 text-center">
          <p className="text-xl flex justify-center items-center">
            {dateKor}
            {item.link !== "" && (
              <img
                className="object-contain h-4 w-4 ms-1 mb-1"
                src={import.meta.env.BASE_URL + `src/assets/github.png`}
                alt=""
              />
            )}
          </p>
          <div className="">
            {item.title.length < 7
              ? item.title
              : item.title.slice(0, 6) + "..."}
          </div>
        </div>
      </div>
    </Link>
  );
};
ListCard.defaultProps = {
  lang: "none",
};
export default ListCard;
