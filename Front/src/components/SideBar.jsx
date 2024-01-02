import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { StateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Octokit } from "@octokit/rest";
const { VITE_GITHUB_CLIENT_ID, VITE_GITHUB_OCTOKIT_TOKEN } = import.meta.env;

const SideBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // const [access_token, setToken] = useState("");
  const URL = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}`;
  const { gitData, setGitData } = useContext(StateContext);
  let access_token = searchParams.get("code");

  let result2;
  const getGitData = async () => {
    console.log("getGitData");
    let result = await axios.post("http://localhost:8000/login", {
      code: access_token,
    });
    localStorage.setItem("userData", JSON.stringify(result.data));
    result2 = localStorage.getItem("userData");
    setGitData(JSON.parse(result2));
  };
  useEffect(() => {
    if (gitData) {
      // setToken(gitData[0].code);
    }
  }, [gitData]);
  useEffect(() => {
    if (access_token != null && gitData == null) {
      getGitData();
    }
  }, [access_token]);
  useEffect(() => {
    setGitData(JSON.parse(localStorage.getItem("userData")));
  }, []);
  // octokit 예시
  // const getData = async () => {
  //   const octokit = new Octokit({
  //     auth: VITE_GITHUB_OCTOKIT_TOKEN,
  //   });
  //   await octokit
  //     .request("GET /orgs/{org}/repos", {
  //       org: "BOOKPROJECT00",
  //     })
  //     .then((res) => console.log(res.data));
  // };

  const logOut = async () => {
    // await axios
    //   .delete("http://localhost:8000/logout", {
    //     data: { accessToken: access_token },
    //   })
    //   .then((res) => console.log(res));
    localStorage.removeItem("userData");
    setGitData("");
    navigate("/");
  };
  return (
    <div className="w-1/3 flex flex-col mt-8 text-4xl font-bold items-center">
      {gitData && (
        <div className="border-b-2 border-gray-300 flex flex-col items-center mx-2 mb-4">
          <img src={gitData[0].img} alt="" className="w-1/3 rounded-xl" />
          <div className="">{gitData[0].id}</div>
        </div>
      )}
      <Link className="mx-4" to={"/"}>
        Home
      </Link>{" "}
      {gitData && (
        <>
          <Link className="mx-4" to={"/New"}>
            New
          </Link>
          <Link className="mx-4" to={"/List"}>
            List
          </Link>
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
          <Link to={"/"} className="mx-4">
            <button onClick={() => logOut()}>Logout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default SideBar;
