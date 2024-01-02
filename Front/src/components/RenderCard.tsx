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
        author: `/ 커밋 작성자: ${copyData.commit.author}`,
        msg: `커밋 메시지: ${copyData.commit.msg}`,
        date: `${copyData.commit.date.slice(0, 10)} 작성`,
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
    const result = await axios.delete(
      `http://localhost:8000/diary/delete?id=${id}`
    );
    navigate("/list");
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
                {diaryData.link}
                {diaryData.commit.msg}
                {diaryData.commit.author}
                {diaryData.commit.date}
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
