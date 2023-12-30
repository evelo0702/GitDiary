import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { StateContext } from "../App";
const HomePage = () => {
  const [searchParams] = useSearchParams();
  const { gitData, setGitData } = useContext(StateContext);
  const code = searchParams.get("code");
  const getGitData = async () => {
    let result = await axios.post("http://localhost:8000/login", { code });
    console.log(result.data);
    setGitData(result.data);
  };


  useEffect(() => {
    if (code) {
      getGitData();
    }
  }, [code]);

  return (
    <div>
      HomePage
      <div className="w-[200px] h-[200px] "></div>
    </div>
  );
};

export default HomePage;
