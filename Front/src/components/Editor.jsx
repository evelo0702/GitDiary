import {  useState } from "react";
import { useLocation } from "react-router-dom";
import BaseBtn from "./BaseBtn";
import MarkdownRender from "./MarkdownRender";
import axios from "axios";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
const code = `
public class BootSpringBootApplication { 
  public????? 
  console.log("BYE!!!!")
}`;

const Editor = ({ gitData }) => {
  let location = useLocation().pathname;
  const [haveGit, setHaveGit] = useState(false);
  const [newData, setNewData] = useState({
    date: getStringDate(new Date()),
    lang: "",
    title: "",
    repo: "",
    link: "",
    content: "",
    code: "",
  });
  const handleData = (type, value) => {
    const copyDate = { ...newData, [type]: value };
    setNewData(copyDate);
  };
  const getCommitData = async () => {
    handleData("link", `https://github.com/${gitData[0].id}/${newData.repo}`);
    // const commitData = await axios.get(
    //   `https://api.github.com/repos/${gitData[0].id}/${newData.link}/commits`
    // );
    // console.log(commitData);
  };

  const langSortOption = [
    {
      value: "js",
      name: "JS",
    },
    {
      value: "css",
      name: "CSS",
    },
    {
      value: "java",
      name: "JAVA",
    },
    {
      value: "next",
      name: "NEXT",
    },
    {
      value: "node",
      name: "NODE",
    },
    {
      value: "python",
      name: "PYTHON",
    },
    {
      value: "spring",
      name: "SPRING",
    },
    {
      value: "ts",
      name: "TS",
    },
    {
      value: "vue",
      name: "VUE",
    },
    {
      value: "html",
      name: "HTML",
    },
  ];
  const handleSubmit = () => {
    // 제목 작성을 안했을때
    // 언어 선택을 안했을때
    // 본문 글이 10글자 이내일때
  };
  const [markdownOn, setMarkdown] = useState(false);
  return (
    <div>
      <div className="">
        <div className="">
          <div className="my-2">
            {location === "/New" ? (
              <input
                type="date"
                value={newData.date}
                onChange={(e) => handleData("date", e.target.value)}
              />
            ) : (
              <div>{newData.date}</div>
            )}
          </div>
          <div className="flex">
            <p className=" font-bold me-4">have git?</p>

            <label className="mx-2">
              <input
                type="radio"
                name="git"
                id="O"
                value={true}
                className="mx-2"
                onChange={(e) => setHaveGit(e.target.value)}
              />
              O
            </label>

            <label className="mx-2">
              <input
                type="radio"
                name="git"
                id="X"
                value={false}
                className="mx-2"
                onChange={(e) => setHaveGit(e.target.value)}
              />
              X
            </label>
          </div>
          <p className="text-xl text-gray-500">
            public 저장소만 선택 가능합니다
          </p>
          {haveGit == "true" ? (
            <div>
              <select
                className="p-2 text-2xl"
                onChange={(e) => handleData("repo", e.target.value)}
              >
                <option value="none">레포지토리 선택</option>
                {gitData[0].repo.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {newData.repo !== "" && newData.repo !== "none" && (
                <select
                  className="p-2 text-2xl"
                  onChange={(e) =>
                    handleData(
                      "link",
                      `https://github.com/${gitData[0].id}/${e.target.value}`
                    )
                  }
                >
                  <option value="none">레포지토리 선택</option>
                  {gitData[0].repo.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ) : null}
        </div>
        {newData.repo}
        <hr />
        {newData.link}
        <div>
          <input
            className="p-1  mb-2 me-2 w-3/4"
            type="text"
            placeholder="제목"
            onChange={(e) => handleData("title", e.target.value)}
          />
          <select
            className="p-2 text-2xl"
            onChange={(e) => handleData("lang", e.target.value)}
          >
            <option>언어선택</option>
            {langSortOption.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name=""
          id=""
          rows="3"
          className="w-full p-4 text-xl border-2 border-gray-400 rounded-md"
          placeholder="코드 입력"
          onChange={(e) => handleData("code", e.target.value)}
        ></textarea>
        <textarea
          name=""
          id=""
          rows="10"
          placeholder="일기 본문 입력"
          className="w-full p-4 border-2 border-gray-400 rounded-md"
          onChange={(e) => handleData("content", e.target.value)}
        ></textarea>
        <button
          className="border-2 border-gray-200 rounded-lg p-0.5"
          onClick={() => setMarkdown(!markdownOn)}
        >
          미리보기
        </button>
        {markdownOn && <MarkdownRender newData={newData} />}
        <div className="flex justify-end">
          <BaseBtn text="일기 저장" size={"normal"} onClick={handleSubmit} />
          <BaseBtn text="취소" size={"normal"} type={"del"} />
        </div>
      </div>
    </div>
  );
};

export default Editor;