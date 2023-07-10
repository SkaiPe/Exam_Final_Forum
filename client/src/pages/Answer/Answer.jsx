import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getProject } from "../../api/projects";
import "./Question.scss";
import AnswerGeneralInfo from "./AnswerGeneralInfo.jsx";
import AnswerActions from "./AnswerActions";

const Answer = () => {
  const { id } = useParams();
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProject(id)
      .then((response) => {
        setAnswer(response);
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

  if (!answer) {
    return <div>Atsakymas neegzistuoja</div>;
  }

  return (
    <div className="answer-container">
      <AnswerActions id={answer.id} />
      <AnswerGeneralInfo project={answer} />
    </div>
  );
};

export default Answer;
