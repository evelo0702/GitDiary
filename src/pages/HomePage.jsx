const HomePage = () => {
  console.log(import.meta.env.BASE_URL);
  return (
    <div>
      HomePage
      <div className="w-[200px] h-[200px] ">
        <img src={import.meta.env.BASE_URL + `public/assets/css.png`} alt="" />
      </div>
    </div>
  );
};

export default HomePage;
