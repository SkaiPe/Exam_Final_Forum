import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getQuestion } from "../../api/questions";
import "./Question.scss";
import QuestionGeneralInfo from "./QuestionGeneralInfo.jsx";
import QuestionActions from "./QuestionActions";

const Question = () => {
  const { id } = useParams();
  const [Question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getQuestion(id)
      .then((response) => {
        setQuestion(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }
  if (!Question) {
    return <div>Klausimas nerastas</div>;
  }

  return (
    <div className="question-container">
      <QuestionActions id={Object.id} />
      <QuestionGeneralInfo question={postMessage} />
    </div>
  );
};

export default Question;
