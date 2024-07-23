import { Link } from "react-router-dom";

const ListCard = ({ item }) => {
  const dateKor = `${new Date(item.date).getFullYear()}년 ${
    new Date(item.date).getMonth() + 1
  }월 ${new Date(item.date).getDate()}일`;
  return (
    <Link to={`/detail/${item._id}`} className="px-20 my-4">
      <div className="flex border border-black rounded-md p-4 h-[20vh] w-full">
        <div className="p-1 my-4 bg-sky-50 flex justify-center items-center">
          {item.lang !== "none" && (
            <img
              className="h-full object-contain"
              src={import.meta.env.BASE_URL + `src/assets/${item.lang}.png`}
              alt=""
            />
          )}
        </div>
        <div className="h-1/2  mx-6 my-4">
          <p className="text-xl flex ">
            {dateKor}
            {item.link !== "" && (
              <img
                className="object-contain h-4 w-4 ms-1 mb-1 "
                src={import.meta.env.BASE_URL + `src/assets/github.png`}
                alt=""
              />
            )}
          </p>
          <div className="">
            {item.title.length < 40
              ? item.title
              : item.title.slice(0, 40) + "..."}
          </div>
          <div className="text-2xl">
            {item.commit.msg}
            <span className="font-bold ms-2 me-2">from</span>
            <span>{item.commit.author}</span>
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
