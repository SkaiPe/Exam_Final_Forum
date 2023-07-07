import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button/Button";
import FormItem from "../../components/FormItem/FormItem";
import { LOGIN_ROUTE } from "../../routes/const";
import "../Login/Login.scss";

// DRY - dont repeat yourself, arba NEkartok kodo

const Register = () => {
  const { handleRegister } = useContext(UserContext);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, lastname, email, password };
    handleRegister(user);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <FormItem
        label="Vardas"
        containerClassname="form-item"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormItem
        label="Pavardė"
        containerClassname="form-item"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />

      <FormItem
        label="El.paštas"
        containerClassname="form-item"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormItem
        label="Slaptažodis"
        containerClassname="form-item"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="button-container">
        <Button>Registruokis</Button>
        <Link to={LOGIN_ROUTE}>Grįžk prisijungti</Link>
      </div>
    </form>
  );
};

export default Register;
