import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TextareaItem from "../../TextareaItem/TextareaItem";
import Button from "../../Button/Button";
import { currentTime } from "../../../utils/fullDate";
import "./EditAnswer.scss";

const EditAnswer = ({
  textValue,
  id,
  deleteAnswer,
  updateAnswer,
  questionId,
  handleEditClose,
  className,
}) => {
  const [editInput, setEditInput] = useState(textValue);

  const editedAnswer = {
    text: editInput,
    edited: true,
    dateCreated: currentTime(),
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/answers/${id}`, editedAnswer)
        .then(handleEditClose(false))
        .then(() => updateAnswer(questionId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={editSubmit} className={className}>
      <TextareaItem
        rows="10"
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
      />

      <div className="btnsContainer">
        <div>
          <Button className="mdBtn" type="submit">
            IŠSAUGOTI
          </Button>
          <Button
            className="mdBtn"
            type="button"
            onClick={() => handleEditClose()}
          >
            ATŠAUKTI
          </Button>
        </div>{" "}
        <Button className="btnDelete" onClick={() => deleteAnswer(id)}>
          IŠTRINTI
        </Button>
      </div>
    </form>
  );
};
EditAnswer.propTypes = {
  textValue: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  handleEditClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default EditAnswer;
