const BaseBtn = ({ text, onClick, type }) => {
  const BtnType = ["fix", "del"].includes(type) ? type : "default";
  return (
    <div>
      <button
        className={`text-xl whitespace-nowrap border
        rounded-md min-w-[50px] h-[30px] text-white ${
          BtnType === "fix"
            ? `bg-sky-500`
            : BtnType === "default"
            ? `bg-indigo-300 hover:bg-indigo-950`
            : BtnType === "del"
            ? ` bg-red-400`
            : `null`
        } `}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
BaseBtn.defaultProps = {
  type: "default",
};
export default BaseBtn;
