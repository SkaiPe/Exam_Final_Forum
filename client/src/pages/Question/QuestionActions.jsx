import { useNavigate, generatePath } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { deleteQuestion } from "../../api/questions";
import { QUESTIONS_ROUTE, EDIT_QUESTION_ROUTE } from "../../routes/const";

const QuestionActions = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteQuestion(id)
      .then(() => {
        navigate(QUESTIONS_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = () => {
    const path = generatePath(EDIT_QUESTION_ROUTE, { id });
    navigate(path);
  };

  return (
    <div className="question-actions">
      <Button variant="outlined" onClick={handleEdit}>
        Redaguoti klausimą
      </Button>
      <Button color="error" onClick={handleDelete}>
        Ištrinti klausimą
      </Button>
    </div>
  );
};

QuestionActions.propTypes = {
  id: PropTypes.number.isRequired,
};

export default QuestionActions;
