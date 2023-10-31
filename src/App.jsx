import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
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

function App() {
  const [data, dispatch] = useReducer(reducer, []);
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
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/New" element={<NewPage />} />
                  <Route path="/Edit" element={<EditPage />} />
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
