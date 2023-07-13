import Login from "./pages/Login/Login";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import Register from "./pages/Register/Register";
import Question from "./pages/Question/Question";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NEW_QUESTION,
  QUESTION_ROUTE,
  REGISTER_ROUTE,
} from "./routes/const";
import Topbar from "./components/Topbar";
import Answers from "./pages/Answers/Answers";

function App() {
  return (
    <UserProvider>
      <Topbar />
      <Routes>
        <Route path={MAIN_ROUTE} element={<Home />} />
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={NEW_QUESTION} element={<Question />} />
        <Route path={QUESTION_ROUTE} element={<Answers />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
