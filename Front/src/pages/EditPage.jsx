import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { StateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
const EditPage = () => {
  const { id } = useParams();
  const { gitData } = useContext(StateContext);
  const [originalData, setData] = useState();
  const getData = async () => {
    const result = await axios.get(
      `http://localhost:8000/diary/detail?id=${id}`
    );
    if (result) {
      setData(result.data[0]);
    }
    console.log(originalData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      EditPage{id}
      <Editor gitData={gitData} originalData={originalData} mode={"edit"} />
    </div>
  );
};

export default EditPage;
