const { VITE_GITHUB_CLIENT_ID, VITE_GITHUB_CLIENT_PW } = import.meta.env;
const LoginPage = () => {
  const URL = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}`;

  return (
    <div>
      LoginPage
      <div>
        <a href={URL}>login</a>
      </div>
    </div>
  );
};

export default LoginPage;
