const Header = ({ leftBtn, centerText, rightBtn }) => {
  return (
    <header className="h-9 flex  mb-4 border-b-2 border-gray-400">
      <div className="w-full flex text-2xl">
        <div className="flex w-1/3 justify-start">{leftBtn}</div>
        <p className="flex w-1/3 justify-center">{centerText}</p>
        <div className="flex w-1/3 justify-end">{rightBtn}</div>
      </div>
    </header>
  );
};

export default Header;
