import "./Layout.css";

const LoginLayout = ({ children }) => {
  return (
    <div className="login-container">
      <h1>Sveiki, prisijungę prie mūsų :)</h1>
      {children}
    </div>
  );
};

export default LoginLayout;
