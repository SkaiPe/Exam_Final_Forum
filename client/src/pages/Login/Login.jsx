import { useState } from "react";
import Input from "../../components/Input";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const inputUserName = (e) => {
    setUserName(e.target.value);
  };

  const inputUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <div>
      <form>
        <Input
          value={userName}
          onChange={inputUserName}
          placeholder="Įveskite vartotojo vardą"
        />
        <Input
          value={userPassword}
          onChange={inputUserPassword}
          placeholder="Įveskite vartotojo slaptažodį"
        />
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
};

export default Login;
