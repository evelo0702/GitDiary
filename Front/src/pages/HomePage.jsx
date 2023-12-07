import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const postBtn = async () => {
    console.log(code);
    if (code) {
      await axios.post("http://localhost:8000/login", { code });
    }
  };

  return (
    <div>
      HomePage
      <div className="w-[200px] h-[200px] "></div>
      <button onClick={postBtn}>postBTN</button>
    </div>
  );
};

export default HomePage;
