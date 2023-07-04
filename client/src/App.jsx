import { useState, useEffect } from "react";

const App = () => {
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
        ascending
      </button>
      <button
        onClick={() => setSort("dsc")}
        style={{ background: sort === "dsc" ? "red" : "white" }}
      >
        descending
      </button>
      {questions.map((post) => (
        <div key={post._id}>
          {post.name} date: {post.date}
        </div>
      ))}
    </div>
  );
};

export default App;
