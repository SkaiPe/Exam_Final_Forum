import { HiOutlineTrash } from "react-icons/hi";
import { AiTwotoneEdit } from "react-icons/ai";
import "./Question.scss";

const Question = ({
  question,
  createdAt,
  isUpdated,
  onClickDelete,
  onClickEdit,
  onViewAllAnswers,
}) => {
  return (
    <div className="question-card">
      <div className="question">
        <p className="question-text">{question}</p>
        <div className="creating-date">(created at: {createdAt})</div>
        <div className="updating">{isUpdated}</div>
      </div>
      <div className="btns-box" onClick={onViewAllAnswers}>
        <div className="view-box">View all answers</div>
        <div className="edit-box" onClick={onClickEdit}>
          <AiTwotoneEdit className="icon" />
        </div>
        <div className="trash-box" onClick={onClickDelete}>
          <HiOutlineTrash className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Question;
