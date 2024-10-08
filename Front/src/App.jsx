import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import SideBar from "./components/SideBar";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [diaryData, setDiaryData] = useState([]);
  const [gitData, setGitData] = useState([{}]);
  useEffect(() => {
    setGitData(JSON.parse(localStorage.getItem("userData")));
  }, []);
  return (
    <StateContext.Provider
      value={{ diaryData, setDiaryData, gitData, setGitData }}
    >
      <DispatchContext.Provider value={{}}>
        <BrowserRouter>
          <div
            className="bg-[#f6f6f6]  mx-auto flex justify-center font-Dongle
       m-0  h-[100vh]"
          >
            <div className="text-4xl sm:w-5/6 bg-white shadow-cus px-10 h-full max-w-[1000px] rounded-md">
              <SideBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/New" element={<NewPage />} />
                <Route path="/Edit/:id" element={<EditPage />} />
                <Route path="/Detail/:id" element={<DetailPage />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
