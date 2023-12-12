import { Link } from "react-router-dom";
import { StateContext } from "../App";
import { useContext } from "react";

const SideBar = () => {
  const { gitData } = useContext(StateContext);
  console.log(gitData[0]);
  return (
    <div className="w-1/3 flex flex-col mt-8 text-4xl font-bold ">
      <Link className="mx-4" to={"/"}>
        Home
      </Link>

      {gitData[0].id && (
        <>
          <Link className="mx-4" to={"/New"}>
            New
          </Link>
          <Link className="mx-4" to={"/List"}>
            List
          </Link>
        </>
      )}
      <Link className="mx-4" to={"/Login"}>
        Login
      </Link>
    </div>
  );
};

export default SideBar;
