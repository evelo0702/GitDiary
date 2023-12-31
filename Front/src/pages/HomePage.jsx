import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../App";
const HomePage = () => {
  return (
    <div>
      HomePage
      <div className="w-[200px] h-[200px] "></div>
    </div>
  );
};

export default HomePage;
