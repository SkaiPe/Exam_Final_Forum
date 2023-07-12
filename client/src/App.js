import Login from "./pages/Login/Login";
import "./App.css";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Login />
    </UserProvider>
  );
}

export default App;
