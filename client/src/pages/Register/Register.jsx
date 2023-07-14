import Input from "../../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../routes/const";
import { useState } from "react";
import "./Register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const user = { email, password, name };

  const userEmail = (e) => {
    setEmail(e.target.value);
  };

  const userName = (e) => {
    setName(e.target.value);
  };
  const userPassword = (e) => {
    setPassword(e.target.value);
  };

  const repeatPassword = (e) => {
    setPasswordRepeat(e.target.value);
  };

  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", user)
      .then(navigate(LOGIN_ROUTE))
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div class="reg-cont">
      <form onSubmit={formSubmit}>
        <h1>Registracija</h1>
        <Input
          value={email}
          onChange={userEmail}
          placeholder="El. paštas"
          required
        />
        <Input
          value={name}
          onChange={userName}
          placeholder="Slapyvardis"
          required
        />
        <Input
          value={password}
          onChange={userPassword}
          placeholder="Slaptažodis"
          type="password"
          required
        />
        <Input
          value={passwordRepeat}
          onChange={repeatPassword}
          placeholder="Pakartokite slaptažodį"
          type="password"
          required
        />

        <button type="submit">Registruotis</button>
      </form>
    </div>
  );
};

export default Register;
