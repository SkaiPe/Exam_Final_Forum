import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Topbar.css";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NEW_QUESTION,
  REGISTER_ROUTE,
} from "../routes/const";

const Topbar = () => {
  const { isLoggedIn, handleLogout } = useContext(UserContext);

  return (
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to={MAIN_ROUTE}>Klausimai</Link>
          <Link to={NEW_QUESTION}>Sukurti klausimą</Link>
          <a onClick={handleLogout}>Atsijungti</a>
        </div>
      ) : (
        <div>
          <Link to={LOGIN_ROUTE}>Prisijungti</Link>
          <Link to={REGISTER_ROUTE}>Registruotis</Link>
          <Link to={MAIN_ROUTE}>Klausimai</Link>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
