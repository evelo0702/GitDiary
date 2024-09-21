const BaseBtn = ({ text, onClick, type, size }) => {
  const BtnType = ["fix", "del"].includes(type) ? type : "default";

  return (
    <div>
      <button
        className={`text-xl whitespace-nowrap border rounded-md min-w-[50px] transition duration-200 ease-in-out focus:outline-none 
          ${
            BtnType === "fix"
              ? `bg-black text-white border-black hover:bg-gray-800`
              : BtnType === "default"
              ? `bg-white text-black border-gray-300 hover:bg-gray-200`
              : BtnType === "del"
              ? `bg-red-600 text-white border-red-600 hover:bg-red-500`
              : `null`
          }
          ${
            size === "small"
              ? `w-[50px] h-[30px]`
              : size === "normal"
              ? `w-[80px] h-[50px]`
              : `w-[100px] h-[70px]`
          }`}
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
