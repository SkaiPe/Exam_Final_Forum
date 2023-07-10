import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { getAnswer } from "../../api/answers";
import NewAnswer from "../NewAnswer/NewAnswert";

const EditAnswer = () => {
  const { id } = useParams();
  const [answer, setAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAnswer(id)
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
    return <div>Klausimas nerastas</div>;
  }

  return <NewAnswer project={answer} />;
};

export default EditAnswer;
