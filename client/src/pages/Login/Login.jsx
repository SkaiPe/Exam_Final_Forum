import { useContext, useState } from "react";
import Input from "../../components/Input";
import "./Login.css";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { handleLogin, message, isLoggedIn, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = { email, password };

  const inputUserName = (e) => {
    setEmail(e.target.value);
  };

  const inputUserPassword = (e) => {
    setPassword(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    handleLogin(userLogin);
    console.log(user);
    console.log(isLoggedIn);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <h1>Prisijungimas</h1>
        <h3>{message}</h3>
        <Input
          value={email}
          onChange={inputUserName}
          placeholder="Įveskite el. paštą"
        />
        <Input
          value={password}
          onChange={inputUserPassword}
          placeholder="Įveskite vartotojo slaptažodį"
          type="password"
        />
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
};

export default Login;
