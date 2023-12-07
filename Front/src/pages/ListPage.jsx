import { useContext, useEffect, useState } from "react";
import BaseBtn from "../components/BaseBtn";
import Header from "../components/Header";
import ListCard from "../components/ListCard";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../App";
import SortMenu from "../components/SortMenu";

const ListPage = () => {
  const diaryData = useContext(StateContext);
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sort, setSort] = useState("latest");
  const [langSort, setLangSort] = useState("all");
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
    if (diaryData.length >= 1) {
      setData(
        diaryData
          .filter((it) => firstDay <= it.date && it.date <= lastDay)
          .sort((a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
          })
      );
      setOriginalData(
        diaryData
          .filter((it) => firstDay <= it.date && it.date <= lastDay)
          .sort((a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
          })
      );
    }
  }, [diaryData, date]);

  // sort
  useEffect(() => {
    const latest = [...originalData].sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
    });
    const oldest = [...originalData].sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
    });

    if (originalData.length > 0) {
      if (sort === "latest") {
        setData(latest);
      }
      if (sort === "oldest") {
        setData(oldest);
      }
    }
  }, [originalData, sort]);
  // langSort
  useEffect(() => {
    if (langSort !== "all") {
      let sortData = originalData.filter((item) => item.lang === langSort);
      setData(sortData);
    }
    if (langSort === "all") {
      setData(originalData);
    }
  }, [originalData, langSort]);
  return (
    <div className="h-[90vh] w-full">
      ListPage
      <Header
        centerText={dateKor}
        leftBtn={<BaseBtn text={"<"} onClick={prevMonth} size={"small"} />}
        rightBtn={<BaseBtn text={">"} onClick={nextMonth} size={"small"} />}
      />
      <div className="w-full mx-auto  flex justify-between text-xl">
        <SortMenu
          sort={sort}
          sortChange={setSort}
          sortOption={sortOption}
          langSort={langSort}
          langChange={setLangSort}
          langSortOption={langSortOption}
        />
        <button
          className="bg-indigo-300 hover:bg-indigo-950 whitespace-nowrap border w-1/4
        rounded-lg text-white p-1"
          onClick={() => navigate("/new")}
        >
          <p className="text-center">새 글 작성</p>
        </button>
      </div>
      <div
        className="h-[82vh] flex flex-wrap justify-center
         overflow-y-auto mt-4"
      >
        {data.length > 0 ? (
          data.map((item, index) => <ListCard item={item} key={index} />)
        ) : (
          <div className="flex justify-center items-center">
            작성한 일기가 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;
