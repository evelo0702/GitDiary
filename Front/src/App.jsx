import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import SideBar from "./components/SideBar";
import ListPage from "./pages/ListPage";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};
export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
const dummyData = [
  {
    id: 1,
    lang: "js",
    date: new Date(2023, 10, 30, 3, 24, 0).getTime(),
    content: "안녕하세요1",
    title: "1번째입니다",
    link: "http://www.naver.com",
  },
  {
    id: 2,
    lang: "js",
    date: new Date(2023, 10, 30, 5, 25, 0).getTime(),
    content: "안녕하세요2",
    title: "2번째입니다",
    link: "http://www.naver.com",
  },
  {
    id: 3,
    lang: "css",
    date: new Date(2023, 10, 30, 2, 20, 0).getTime(),
    content: "안녕하세요3",
    title: "3번째입니다",
    link: "http://www.naver.com",
  },
  {
    id: 4,
    lang: "python",
    date: new Date(2023, 10, 30, 17, 0, 0).getTime(),
    content: "안녕하세요4",
    title: "4번째입니다",
    link: "",
  },
  {
    id: 5,
    lang: "ts",
    date: new Date(2023, 10, 30, 1, 25, 0).getTime(),
    content: "안녕하세요5",
    title: "5번째입니다",
    link: "http://www.naver.com",
  },
  {
    id: 6,
    lang: "vue",
    date: new Date(2023, 10, 30, 13, 10, 0).getTime(),
    content: "안녕하세요6",
    title: "6번째입니다",
    link: "",
  },
  {
    id: 7,
    lang: "vue",
    date: new Date(2023, 11, 1, 13, 10, 0).getTime(),
    content: "안녕하세요7",
    title: "7번째입니다",
    link: "",
  },
  {
    id: 8,
    lang: "vue",
    date: new Date(2023, 10, 11, 13, 10, 0).getTime(),
    content: "안녕하세요8",
    title: "8번째입니다",
    link: "",
  },
];
function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, title, link, lang) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        title,
        link,
        lang,
      },
    });
    dataId.current += 1;
  };
  // EDIT
  const onEdit = (targetId, date, content, title, link, lang) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        title,
        link,
        lang,
      },
    });
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  return (
    <StateContext.Provider value={data}>
      <DispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className=" bg-black">
            <div
              className="bg-[#f6f6f6] max-w-[70vw] mx-auto flex justify-end min-h-[100vh] font-Dongle
       m-0"
            >
              <SideBar />
              <div className="text-4xl sm:w-2/3 bg-white shadow-cus min-h-[100vh] min-w-[180px] px-10 py-10">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/New" element={<NewPage />} />
                  <Route path="/List" element={<ListPage />} />
                  <Route path="/Edit/:id" element={<EditPage />} />
                  <Route path="/Detail/:id" element={<DetailPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
