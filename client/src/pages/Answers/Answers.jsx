import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../api/questions";
import CommentInput from "../../components/CommentInput";
import Input from "../../components/Input";
import { UserContext } from "../../context/UserContext";
import "./Answers.css";
import Comment from "../../components/Comment";

const Answers = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { questionId } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getQuestion(questionId)
      .then((response) => {
        setQuestion(response[0]);
        console.log(response);
        setComments(response[0].comments);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [questionId]);

  const answer = {
    text: comment,
    edited: false,
    date: new Date().toLocaleString(),
    name: (user && user.name) || "",
  };

  const commentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/question/${questionId}/answers`, answer)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {isLoading ? <div>Loading</div> : ""}
      <div>Vartotojas: {question.name}</div>
      <div>{question.date}</div>
      <h4>{question.text}</h4>
      {user ? (
        <form onSubmit={commentSubmit}>
          <button type="submit">Atsakyti</button>

          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Įveskite savo atsakymą čia..."
          />
        </form>
      ) : (
        "Norėdami komentuoti prisijunkite"
      )}
      <div>
        <h3>Atsakymai:</h3>
        <div>
          {comments.map((item, index) => (
            <div key={index} className="container">
              <Comment item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Answers;
