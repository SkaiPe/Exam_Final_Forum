import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import "./Profile.scss";

const Profile = () => {
  const { user, handleUpdateUser, handleLogout } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, lastname, email, password };
    handleUpdateUser(user);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
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
        <Button>Atnaujinta</Button>
        <Button type="button" variant="outlined" onClick={handleLogout}>
          Atsijungta
        </Button>
      </div>
    </form>
  );
};

export default Profile;
