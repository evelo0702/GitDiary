import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import axios from "axios";
const MarkdownRender = ({ newData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [markdownData, setMarkdown] = useState();
  const [diaryData, setDiaryData] = useState(newData);
  const getData = (reloadData) => {
    let copyData = newData;
    if (diaryData == null && reloadData) {
      copyData = reloadData;
    }

    if (copyData && copyData.commit != "") {
      copyData.commit = {
        author: `${copyData.commit.author}`,
        msg: `${copyData.commit.msg}`,
        date: `${copyData.commit.date.slice(0, 10)}`,
      };
    }
    setDiaryData(copyData);
  };
  let date;
  let markdown;
  const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
  const reloadData = async () => {
    const result = await axios.get(
      `http://localhost:8000/diary/detail?id=${id}`
    );

    getData(result.data[0]);
  };

  useEffect(() => {
    if (!newData) {
      reloadData();
    }
  }, []);

  if (diaryData) {
    date = getStringDate(new Date(diaryData.date));
    markdown = `

  \`\`\`
  ${diaryData.code}
  \`\`\`
  > ${diaryData.content}
`;
  }
  const DeleteNote = async () => {
    const confirmDelete = window.confirm("해당 글을 삭제하시겠습니까?");
    if (confirmDelete) {
      const result = await axios.delete(
        `http://localhost:8000/diary/delete?id=${id}`
      );
      navigate("/");
    }
  };
  const EditNote = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <div>
      {diaryData && (
        <div>
          <div>
            <div className=" text-5xl mt-6 mb-3">{diaryData.title}</div>
            <div className="flex text-2xl items-center mb-3">
              <div>{date}</div>
              <div className="ms-4">{diaryData.author}</div>
              <button
                className="mx-2 border rounded-lg bg-red-400 p-0.5 text-xl"
                onClick={DeleteNote}
              >
                삭제하기
              </button>
              <button
                className="mx-2 border rounded-lg bg-slate-400 p-0.5 text-xl"
                onClick={EditNote}
              >
                수정하기
              </button>
            </div>
            <hr />
          </div>
          <div>
            {diaryData.commit && (
              <div>
                <div className="text-2xl">
                  <span className="font-bold">Commit-Message :</span>
                  <span className="ms-2 text-2xl">
                    {diaryData.commit.msg} from
                  </span>
                  <span className="ms-2 text-3xl">
                    {diaryData.commit.author}
                  </span>
                </div>
                <div className="text-2xl">
                  <span className="font-bold">Repo-Link:</span>
                  <a className="ms-2" href={diaryData.link} target="_blank">
                    {diaryData.link}
                  </a>
                </div>

                <div></div>

                <div className="text-2xl">
                  <span className="font-bold">Commit-Date:</span>
                  <a className="ms-2" href={diaryData.link} target="_blank">
                    {diaryData.commit.date}
                  </a>
                </div>
              </div>
            )}
          </div>
          <ReactMarkdown
            className="mt-6 prose min-w-full text-black"
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  className="text-indigo-500 no-underline"
                />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="no-underline text-2xl" />
              ),
              code: ({ node, ...props }) => (
                <code {...props} className="text-white " />
              ),
              img: ({ node, ...props }) => (
                <img {...props} className="w-10 h-8 me-2" />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className="flex items-center w-full h-10 mt-0 p-0 text-4xl"
                />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default MarkdownRender;
