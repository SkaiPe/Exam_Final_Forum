import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../../routes/const";
import { UserContext } from "../../context/UserContext";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import "../Login/Login.scss";

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
        label="Name"
        containerClassname="form-item"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormItem
        label="Lastname"
        containerClassname="form-item"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />

      <FormItem
        label="Email"
        containerClassname="form-item"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormItem
        label="Password"
        containerClassname="form-item"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="button-container">
        <Button>Register</Button>
        <Link to={LOGIN_ROUTE}>Back to Login</Link>
      </div>
    </form>
  );
};

export default Register;
