import { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { currentTime } from "../../utils/fullDate";
import { UserContext } from "../../context/UserContext";
import TextareaItem from "../TextareaItem/TextareaItem";
import "./AnswerInput.scss";
import Button from "../Button/Button";

const AnswerInput = ({ questionId, updateQuestion, placeholder }) => {
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);

  const answer = {
    dateCreated: currentTime(),
    edited: false,
    questionId: questionId,
    name: (user && user.name) || "",
    userId: (user && user._id) || "",
    text,
    userLikes: [],
    likeCounter: 0,
  };

  const answerSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/questions/${questionId}/answers`, answer)
      .then(() => {
        updateQuestion(questionId);
      })

      .then(() => setText(""))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={answerSubmitHandler} className="inputContainer">
      <TextareaItem
        placeholder={placeholder}
        rows="10"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></TextareaItem>
      <Button className="mdBtn" type="submit">
        Atsakymas:
      </Button>
    </form>
  );
};
AnswerInput.propTypes = {
  questionId: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default AnswerInput;
