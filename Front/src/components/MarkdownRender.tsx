import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRender = ({ newData }) => {
  console.log(newData);
  const [markdownData, setMarkdown] = useState();
  const getData = () => {
    const copyData = newData;
    console.log(copyData);
    if (newData.commit == "") {
      copyData.commit = { author: "", msg: "" };
    }
  };
  getData();
  const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
  const markdown = `
  
  ${getStringDate(new Date(newData.date))}  
  ## ![Alt text](../src/assets/${newData.lang}.png)   ${newData.title} -**${
    newData.author
  }**
  
  
  ${newData.link}
  
  ${newData.commit.msg} **${newData.commit.author}**
  
  

  
  \`\`\`
  ${newData.code}
  \`\`\`
  > ${newData.content}
`;

  return (
    <div>
      <ReactMarkdown
        className="prose min-w-full text-black"
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
  );
};

export default MarkdownRender;
