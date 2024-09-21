const Header = ({ leftBtn, centerText, rightBtn }) => {
  return (
    <header className="w-1/2 flex items-center h-16 mb-4 bg-white shadow-lg rounded-lg border border-gray-300">
      <div className="w-full flex text-xl font-semibold text-gray-800">
        <div className="flex w-1/3 justify-start p-4">{leftBtn}</div>
        <p className="flex w-1/3 justify-center text-gray-900 items-center">
          {centerText}
        </p>
        <div className="flex w-1/3 justify-end p-4">{rightBtn}</div>
      </div>
    </header>
  );
};

export default Header;
