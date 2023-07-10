import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { deleteAnswer } from "../../api/answers";
import { ANSWERS_ROUTE, EDIT_ANSWER_ROUTE } from "../../routes/const";

const AnswerActions = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteAnswer(id)
      .then(() => {
        navigate(ANSWERS_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    const path = generatePath(EDIT_ANSWER_ROUTE, { id });
    navigate(path);
  };

  return (
    <div className="answer-actions">
      <Button variant="outlined" onClick={handleEdit}>
        Redaguoti klausimą
      </Button>
      <Button color="error" onClick={handleDelete}>
        Ištrinti klausimą
      </Button>
    </div>
  );
};

AnswerActions.propTypes = {
  id: PropTypes.number.isRequired,
};

export default AnswerActions;
