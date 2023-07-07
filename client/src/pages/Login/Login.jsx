import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import { REGISTER_ROUTE } from "../../routes/const";
import "./Login.scss";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    handleLogin(user, setError);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
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

        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <Button>Prisijungti</Button>
          <Link to={REGISTER_ROUTE}>Registruotis</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
