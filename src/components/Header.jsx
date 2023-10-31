const Header = ({ leftText, centerText, rightText }) => {
  return (
    <header className="h-9 flex  mb-4">
      <div className="w-full flex text-xl">
        <p className="flex w-1/3 justify-start">leftText</p>
        <p className="flex w-1/3 justify-center">centerText</p>
        <p className="flex w-1/3 justify-end">rightText</p>
      </div>
    </header>
  );
};

export default Header;
