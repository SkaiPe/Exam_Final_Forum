import PropTypes from "prop-types";
import Like from "../Like/Like";
import "./AnswerCard.scss";

const AnswerCard = ({
  className,
  name,
  likeCounter,
  userlikes,
  dateCreated,
  answer,
  edited,
  id,
}) => {
  return (
    <div className={`${className} answerContainer`}>
      <Like likeCounter={likeCounter} userLikes={userLikes} commentId={id} />
      <div className="containerText">
        <div className="answerHeader">
          <span> Atsakė: {name}</span>
          <span>
            {edited ? "Date Edited: " : "Date created: "}
            {dateCreated}
          </span>
        </div>
        <div className="answerBody">{answer}</div>
      </div>
    </div>
  );
};

AnswerCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  likeCounter: PropTypes.number.isRequired,
  userLikes: PropTypes.array.isRequired,
  dateCreated: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  edited: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default AnswerCard;
