import { useContext, useEffect, useState } from "react";
import BaseBtn from "../components/BaseBtn";
import Header from "../components/Header";
import ListCard from "../components/ListCard";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import SortMenu from "../components/SortMenu";
import axios from "axios";
const HomePage = () => {
  const { diaryData, setDiaryData } = useContext(StateContext);
  const { gitData } = useContext(StateContext);
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sort, setSort] = useState("oldest");
  const [langSort, setLangSort] = useState("all");
  const getDiaryData = async () => {
    if (gitData[0].id) {
      const result = await axios.get(
        `http://localhost:8000/diary?author=${gitData[0].id}`
      );
      if (result) {
        localStorage.setItem("diaryData", JSON.stringify(result.data));
        setDiaryData(result.data);
      }
    }
  };
  useEffect(() => {
    if (gitData) {
      getDiaryData();
    }
    if (gitData == null) {
      setDiaryData(null);
      setData(null);
    }
  }, [gitData]);

  const sortOption = [
    {
      value: "latest",
      name: "최신순",
    },
    {
      value: "oldest",
      name: "오래된 순",
    },
  ];
  const langSortOption = [
    { value: "all", name: "모든언어" },
    {
      value: "js",
      name: "JS",
    },
    {
      value: "css",
      name: "CSS",
    },
    {
      value: "java",
      name: "JAVA",
    },
    {
      value: "next",
      name: "NEXT",
    },
    {
      value: "node",
      name: "NODE",
    },
    {
      value: "python",
      name: "PYTHON",
    },
    {
      value: "spring",
      name: "SPRING",
    },
    {
      value: "ts",
      name: "TS",
    },
    {
      value: "vue",
      name: "VUE",
    },
    {
      value: "html",
      name: "HTML",
    },
    {
      value: "react",
      name: "REACT",
    },
  ];
  // 날짜 변경
  const dateKor = `${date.getFullYear()}년 ${date.getMonth() + 1}월 `;
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  // date filter
  useEffect(() => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      24
    ).getTime();
    if (diaryData && diaryData.length >= 1) {
      let filterData = diaryData
        .filter((it) => firstDay <= it.date && it.date <= lastDay)
        .sort((a, b) => {
          if (a.date > b.date) return 1;
          if (a.date < b.date) return -1;
        });
      setData(filterData);
      setOriginalData(filterData);
    }
  }, [diaryData, date]);

  // sort
  useEffect(() => {
    if (data.length > 0) {
      let sortedData = [...data].sort((a, b) =>
        sort === "latest" ? b.date - a.date : a.date - b.date
      );
      setData(sortedData);
    }
  }, [sort]);

  // langFilter
  useEffect(() => {
    let filterData =
      langSort === "all"
        ? originalData
        : originalData.filter((item) => item.lang === langSort);
    let sortData = [...filterData].sort((a, b) =>
      sort === "latest" ? b.date - a.date : a.date - b.date
    );
    setData(sortData);
  }, [langSort]);

  return (
    <div>
      <div className="flex">
        <Header
          centerText={dateKor}
          leftBtn={<BaseBtn text={"<"} onClick={prevMonth} size={"small"} />}
          rightBtn={<BaseBtn text={">"} onClick={nextMonth} size={"small"} />}
        />
        <div className="w-1/2 mx-auto flex justify-between text-xl p-2 items-center h-16 mb-4 bg-white shadow-lg rounded-lg border border-gray-300">
          <SortMenu
            sort={sort}
            sortChange={setSort}
            sortOption={sortOption}
            langSort={langSort}
            langChange={setLangSort}
            langSortOption={langSortOption}
          />
          {gitData && (
            <button
              className="bg-slate-600 black hover:bg-indigo-950 whitespace-nowrap border w-1/4
          rounded-lg text-white p-1"
              onClick={() => navigate("/New")}
            >
              <p className="text-center">새 글 작성</p>
            </button>
          )}
        </div>
      </div>
      <div
        className="h-[80vh] grid grid-cols-2 grid-rows-3  mt-2"
        style={{ maxWidth: "1000px" }}
      >
        {data !== null && data.length > 0 ? (
          data.map((item, index) => (
            <div className="w-full h-[calc(82vh/3)]" key={index}>
              <ListCard item={item} />
            </div>
          ))
        ) : gitData ? (
          <div className="col-span-2 flex justify-center items-center">
            {dateKor.slice(5)}에 작성한 노트가 없습니다
          </div>
        ) : (
          <div className="col-span-2 flex justify-center items-center">
            로그인을 해주세요
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
