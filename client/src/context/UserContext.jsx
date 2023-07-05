import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../routes/const";
import { checkUserCredentials } from "../utils/user";
import { getUsers, createUser, updateUser } from "../api/users";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => null,
  handleLogout: () => null,
  handleRegister: () => null,
  handleUpdateUser: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const handleLogin = (user, setError) => {
    getUsers()
      .then((response) => {
        const existingUser = checkUserCredentials(response, user);
        if (existingUser) {
          setUser(existingUser);
          localStorage.setItem("user", JSON.stringify(existingUser));
        } else {
          setError("User email or password is incorrect.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
    navigate(LOGIN_ROUTE);
  };

  const handleRegister = (newUser) => {
    createUser(newUser)
      .then(() => {
        navigate(LOGIN_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateUser = (updatingUser) => {
    updateUser(user.id, updatingUser)
      .then((response) => {
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
