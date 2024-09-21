import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../App";
import { useContext, useEffect } from "react";
import axios from "axios";
const { VITE_GITHUB_CLIENT_ID } = import.meta.env;

const SideBar = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const URL = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}`;
  const { gitData, setGitData } = useContext(StateContext);
  let access_token = searchParams.get("code");
  let result2;
  const getGitData = async () => {
    let result = await axios.post("http://localhost:8000/login", {
      code: access_token,
    });

    localStorage.setItem("userData", JSON.stringify(result.data));
    result2 = localStorage.getItem("userData");
    setGitData(JSON.parse(result2));
    access_token = null;
  };

  const logOut = () => {
    localStorage.removeItem("userData");
    setGitData(null);
    navigate("/");
  };
  useEffect(() => {
    if (access_token) {
      getGitData();
    }
    access_token = searchParams.get("code");
  }, [access_token]);

  return (
    <div className="flex text-5xl items-center h-[10vh]">
      <Link className="flex w-full" to={"/"}>
        Git-Diary
      </Link>

      <div className="w-full flex text-3xl font-bold items-center justify-end">
        {gitData && (
          <>
            <img src={gitData[0].img} alt="" className="w-1/12 rounded-xl" />
            <div className="me-4 text-3xl">{gitData[0].id}</div>{" "}
          </>
        )}
        {!gitData ? (
          <div className="flex items-center">
            <img
              src="http://localhost:5173/src/assets/github.png"
              alt=""
              className="w-5 h-5 me-2"
            />
            <Link className="mt-1" to={URL}>
              Login
            </Link>
          </div>
        ) : (
          <>
            <div onClick={() => logOut()}>Logout</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
