import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BaseBtn from "./BaseBtn";
import axios from "axios";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const Editor = ({ gitData, mode, originalData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation().pathname;

  const [haveGit, setHaveGit] = useState(false);
  const [addCommit, setCommit] = useState(false);
  const resetCommit = () => {
    setCommit(false);
    const copyData2 = {
      ...newData,
      repo: "",
      link: "",
      commit: "No-Data",
    };
    setNewData(copyData2);
  };
  const [newData, setNewData] = useState({
    date: new Date().getTime(),
    lang: "",
    title: "",
    content: "",
    link: "",
    repo: "",
    code: "",
    commit: "",
  });

  useEffect(() => {
    setNewData(originalData);
  }, [originalData]);
  const [commitList, setCommitList] = useState([]);
  useEffect(() => {
    if (addCommit == false) {
      const copyData2 = {
        ...newData,
        repo: "",
        link: "",
        commit: "No-Data",
      };
      setNewData(copyData2);
    }
  }, [addCommit]);
  const handleData = (type, value) => {
    if (value != null) {
      const copyData = { ...newData, [type]: value };
      setNewData(copyData);
    }

    if (
      (type == "repo" || type == "link" || type == "commit") &&
      haveGit == false &&
      addCommit == false
    ) {
      const copyData2 = {
        ...newData,
        repo: "",
        link: "",
        commit: "No-Data",
      };
      return setNewData(copyData2);
    }
    if (type === "repo") {
      const copyData2 = {
        ...newData,
        repo: value,
        link: `https://github.com/${gitData[0].id}/${value}`,
      };
      setNewData(copyData2);
      if (value !== "") {
        getCommitData(copyData2, value);
      }
    }
  };
  const getCommitData = async (copyDate2, value) => {
    const commitData = await axios.get(
      `https://api.github.com/repos/${gitData[0].id}/${value}/commits`
    );
    if (commitData.data) {
      const commit = commitData.data.map((item, index) => [
        {
          commit_id: index,
          date: item.commit.author.date,
          author: item.commit.author.name,
          url: item.html_url,
          msg: item.commit.message,
        },
      ]);
      setCommitList(commit);
      console.log(commit);
    }
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
  const handleSubmit = async () => {
    // 제목 작성을 안했을때
    // 언어 선택을 안했을때
    // 본문 글이 10글자 이내일때
    if (!newData.title) {
      return alert("제목을 입력해주세요");
    }
    if (!newData.content) {
      return alert("본문을 입력해주세요");
    }
    if (!newData.lang) {
      return alert("언어를 선택해주세요");
    }
    if (newData.content.length < 10) {
      return alert("본문은 10글자 이상을 입력해주세요");
    }
    let copyData;
    if (gitData) {
      const author = { author: gitData[0].id };
      copyData = { ...newData, ...author };
    }
    await axios
      .post("http://localhost:8000/diary", {
        copyData,
      })
      .then(() => navigate("/list"));
  };
  const handleEdit = async () => {
    if (!newData.title) {
      return alert("제목을 입력해주세요");
    }
    if (!newData.content) {
      return alert("본문을 입력해주세요");
    }
    if (!newData.lang) {
      return alert("언어를 선택해주세요");
    }
    if (newData.content.length < 10) {
      return alert("본문은 10글자 이상을 입력해주세요");
    }
    console.log(addCommit);

    console.log(newData);

    // await axios
    //   .post(`http://localhost:8000/diary/edit?id=${id}`, {
    //     newData,
    //   })
    //   .then(() => navigate("/list"));
  };

  useEffect(() => {
    if (haveGit == false) {
      handleData("repo", "");
      handleData("link", "");
      handleData("commit", "");
    }
  }, [haveGit]);
  return (
    // 추후 보강사항 - 글작성과 수정 페이지의 다른 코드 구조를 명확하게 구분할수있게 만들것
    <div>
      <div className="px-4">
        <div className="">
          <div className="my-2">
            {location == "/New" ? (
              <input
                type="date"
                value={getStringDate(new Date(newData.date))}
                onChange={(e) =>
                  handleData("date", new Date(e.target.value).getTime())
                }
              />
            ) : (
              <div>{getStringDate(new Date(newData.date))}</div>
            )}
          </div>
          <div className="flex">
            {location == "/New" ? (
              <div>
                <p className=" font-bold me-4">have git?</p>
                <label className="mx-2">
                  <input
                    type="radio"
                    name="git"
                    id="O"
                    value={true}
                    className="mx-2"
                    onChange={() => setHaveGit(true)}
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
                    onChange={() => setHaveGit(false)}
                  />
                  X
                </label>
                <p className="text-xl text-gray-500 mx-4">
                  public 저장소만 선택 가능합니다
                </p>
              </div>
            ) : (
              <div>
                {addCommit || (originalData && newData.commit != "No-Data") ? (
                  <button
                    onClick={() => {
                      resetCommit();
                    }}
                  >
                    커밋삭제
                  </button>
                ) : (
                  <button onClick={() => setCommit(true)}>커밋추가</button>
                )}

                {addCommit ? (
                  <div>
                    <select
                      className="text-2xl my-2"
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
                        className="text-xl flex my-2"
                        onChange={(e) =>
                          handleData("commit", JSON.parse(e.target.value))
                        }
                      >
                        <option value="none">커밋 선택</option>
                        {commitList &&
                          commitList.map((item) => (
                            <option
                              key={item[0].id}
                              value={JSON.stringify(item[0])}
                              className=" overflow-auto"
                            >
                              {item[0].author} -{" "}
                              {item[0].msg.length > 60
                                ? item[0].msg.slice(0, 60) + "....."
                                : item[0].msg}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                ) : (
                  <div>
                    {originalData && newData.commit == "No-Data" ? null : (
                      <div>{newData.commit.msg}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {haveGit == true ? (
            <div className="">
              <select
                className="text-2xl my-2"
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
                  className="text-xl flex my-2"
                  onChange={(e) =>
                    handleData("commit", JSON.parse(e.target.value))
                  }
                >
                  <option value="none">커밋 선택</option>
                  {commitList &&
                    commitList.map((item) => (
                      <option
                        key={item[0].id}
                        value={JSON.stringify(item[0])}
                        className=" overflow-auto"
                      >
                        {item[0].author} -{" "}
                        {item[0].msg.length > 60
                          ? item[0].msg.slice(0, 60) + "....."
                          : item[0].msg}
                      </option>
                    ))}
                </select>
              )}
            </div>
          ) : null}
        </div>

        <div>
          {originalData ? (
            <input
              className="p-1  mb-2 me-2 w-3/4"
              type="text"
              placeholder="제목"
              defaultValue={originalData.title}
              onChange={(e) => handleData("title", e.target.value)}
            />
          ) : (
            <input
              className="p-1  mb-2 me-2 w-3/4"
              type="text"
              placeholder="제목"
              onChange={(e) => handleData("title", e.target.value)}
            />
          )}

          {originalData ? (
            <>
              <select
                className="p-2 text-2xl"
                onChange={(e) => handleData("lang", e.target.value)}
                defaultValue={originalData.lang}
              >
                <option value={""}>언어선택</option>
                {langSortOption.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <select
              className="p-2 text-2xl"
              onChange={(e) => handleData("lang", e.target.value)}
            >
              <option value={""}>언어선택</option>
              {langSortOption.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
        {originalData ? (
          <>
            <textarea
              name=""
              id=""
              rows="3"
              className="w-full p-4 text-xl border-2 border-gray-400 rounded-md"
              placeholder="코드 입력"
              defaultValue={originalData.code}
              onChange={(e) => handleData("code", e.target.value)}
            ></textarea>
            <textarea
              name=""
              id=""
              rows="10"
              placeholder="노트 본문 입력"
              defaultValue={originalData.content}
              className="w-full p-4 border-2 border-gray-400 rounded-md"
              onChange={(e) => handleData("content", e.target.value)}
            ></textarea>
          </>
        ) : (
          <>
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
              placeholder="노트 본문 입력"
              className="w-full p-4 border-2 border-gray-400 rounded-md"
              onChange={(e) => handleData("content", e.target.value)}
            ></textarea>
          </>
        )}
        {originalData ? (
          <div className="flex justify-end">
            <span className="me-4">
              <BaseBtn text="노트 수정" size={"normal"} onClick={handleEdit} />
            </span>
            <BaseBtn text="취소" size={"normal"} type={"del"} />
          </div>
        ) : (
          <div className="flex justify-end">
            <BaseBtn text="노트 저장" size={"normal"} onClick={handleSubmit} />
            <BaseBtn text="취소" size={"normal"} type={"del"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
