import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRender = ({ newData }) => {
  const markdown = `A paragraph with *emphasis* and **strong importance**.
  > A block quote with ~strikethrough~ and a URL: ${newData.link}.

  ${newData.date} ![Alt text](src/assets/${newData.lang}.png)
  # ${newData.title}

  > ${newData.content}
  \`\`\`
  ${newData.code}
  \`\`\`

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
            <p {...props} className="no-underline text-xl" />
          ),
          code: ({ node, ...props }) => (
            <code {...props} className="text-white" />
          ),
          img: ({ node, ...props }) => <img {...props} className="" />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRender;
