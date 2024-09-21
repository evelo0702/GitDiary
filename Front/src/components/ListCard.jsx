import { Link } from "react-router-dom";

const ListCard = ({ item }) => {
  const dateKor = `${new Date(item.date).getFullYear()}년 ${
    new Date(item.date).getMonth() + 1
  }월 ${new Date(item.date).getDate()}일`;

  return (
    <Link
      to={`/detail/${item._id}`}
      className="block hover:shadow-lg transition-shadow duration-300 my-6"
    >
      {/* 카드 높이를 부모 요소 높이의 1/3로 고정 */}
      <div className="m-1 flex border border-gray-300 rounded-lg p-4 h-[calc(80vh/4)] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="p-2 bg-sky-100 rounded-md flex justify-center items-center w-1/5 min-w-[80px]">
          {item.lang !== "none" && (
            <img
              className="h-12 w-12 object-contain"
              src={import.meta.env.BASE_URL + `src/assets/${item.lang}.png`}
              alt=""
            />
          )}
        </div>
        <div className="flex-1 ml-4 overflow-hidden">
          <p className="text-lg text-gray-600 flex items-center">
            {dateKor}
            {item.link !== "" && (
              <img
                className="object-contain h-5 w-5 ml-2"
                src={import.meta.env.BASE_URL + `src/assets/github.png`}
                alt="GitHub Link"
              />
            )}
          </p>
          <div className="text-xl font-semibold text-gray-900 mt-2">
            {item.title}
          </div>
          {item.commit !== "No-Data" && (
            <div className="text-xl text-gray-500 mt-1">
              {item.commit.msg}
              <span className="font-bold text-gray-700 mx-2">from</span>
              <span>{item.commit.author}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

ListCard.defaultProps = {
  lang: "none",
};

export default ListCard;
