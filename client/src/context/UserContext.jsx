import { createContext, useState } from "react";
import axios from "axios";
import { MAIN_ROUTE } from "../routes/const";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => null,
  handleLogout: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  isLoggedIn = !!user;

  const navigate = useNavigate();

  const handleLogin = (userLogin) => {
    axios
      .post("http://localhost:3000/login", userLogin)
      .then((response) => {
        setIsLoggedIn(response.data.loggedIn);

        if (response.data.loggedIn) {
          localStorage.setItem("user", JSON.stringify(response.data.userData));
          setMessage("Sveiki prisijungę");
          setUser(response.data.userData);
          navigate(MAIN_ROUTE);
        } else {
          setMessage("Klaida. Bandykite dar karta");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
    navigate(MAIN_ROUTE);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        message,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
