import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <div
        className="bg-[#f6f6f6] flex justify-center items-center min-h-[100vh]
       m-0 "
      >
        <div className="font-Dongle text-4xl sm:w-[640px] bg-white shadow-cus min-h-[100vh] px-10 py-10">
          <header className="w-full h-9">
            <Link className="m-4" to={"/"}>
              Home
            </Link>
            <Link className="m-4" to={"/New"}>
              New
            </Link>
            <Link className="m-4" to={"/Edit"}>
              Edit
            </Link>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/New" element={<NewPage />} />
            <Route path="/Edit" element={<EditPage />} />
            <Route path="/Detail/:id" element={<DetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
