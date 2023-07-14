import { useContext, useState } from "react";
import Input from "../../components/Input";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Question.css";

const Question = () => {
  const [question, setQuestion] = useState("");
  const { user } = useContext(UserContext);

  const questionOnChange = (e) => {
    setQuestion(e.target.value);
  };

  const navigate = useNavigate();

  const userQuestion = {
    text: question,
    edited: false,
    date: new Date().toLocaleString(),
    name: user.name,
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/question", userQuestion)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div class="question-container">
      <form onSubmit={formSubmit}>
        <h1>Užduokite klausimą</h1>
        <Input
          value={question}
          onChange={questionOnChange}
          placeholder="Užduokite klausimą..."
        />
        <button type="submit">Klausti</button>
      </form>
    </div>
  );
};

export default Question;
