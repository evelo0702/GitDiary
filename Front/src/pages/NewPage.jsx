import { useContext, useState } from "react";
import Editor from "../components/Editor";
import { StateContext } from "../App";
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const NewPage = () => {
  const { gitData } = useContext(StateContext);

  const [newDate, setNewDate] = useState([
    {
      date: getStringDate(new Date()),
      lang: "",
      title: "",
      link: "",
      content: "",
      code: "",
    },
  ]);

  const handleDate = (name, value) => {
    console.log(`${name}, ${value}`);
  };
  return (
    <div className="text-3xl">
      <div className="flex justify-center border-b-2 p-2">새 노트 작성</div>
      <Editor gitData={gitData} />
    </div>
  );
};

export default NewPage;
