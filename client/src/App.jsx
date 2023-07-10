import { useState, useEffect } from "react";
import Routes from "./routes/Routes";
import Providers from "./context/Providers";

const App = () => {
  <Providers>
    <Routes />
  </Providers>;

  const [questions, setQuestions] = useState([]);
  const [sort, setSort] = useState("asc");
  useEffect(() => {
    fetch(`http://localhost:3000/questions?sort=${sort}`)
      .then((resp) => resp.json())
      .then((response) => {
        setQuestions(response);
      });
  }, [sort]);
  return (
    <div>
      <button
        onClick={() => setSort("asc")}
        style={{ background: sort === "asc" ? "red" : "white" }}
      >
        {" "}
        Didėjančiai{" "}
      </button>
      <button
        onClick={() => setSort("dsc")}
        style={{ background: sort === "dsc" ? "red" : "white" }}
      >
        Mažėjančiai
      </button>
      {questions.map((question) => (
        <div key={question._id}>
          {question.name} income: {question.income}
        </div>
      ))}
    </div>
  );
};

export default App;
