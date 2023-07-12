import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import EditQuestion from "../EditQuestion";
import { FaRegAnswerAlt } from "react-icons/fa";
import "./Question.scss";
import Button from "../Button/Button";

const Question = ({
  name,
  dateCreated,
  post,
  text,
  answerNumber,
  edited,
  onClick,
  questionId,
  userId,
}) => {
  const { user } = useContext(UserContext);
  const [showEdit, setShowEdit] = useState(false);
  return (
    <>
      <div className="cardContainer">
        {showEdit ? (
          user &&
          user._id !== null &&
          user._id === userId && (
            <EditQuestion
              post={post}
              text={text}
              questionId={questionId}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
            />
          )
        ) : (
          <div className="questionContent" onClick={onClick}>
            <div className="questionCardHeader">
              <span> Paklausė {name}</span>
              <span>
                {edited ? "Date edited:" : "Date created:"} {dateCreated}
              </span>
            </div>
            <div>
              <div>
                <h2 className="questionPost">{post}</h2>
              </div>
              <div>
                <p className="questionText">{text}</p>
              </div>

              <div className="questionCardFooter">
                <div>
                  <FaRegAnswerAlt /> {answerNumber} <span>Atsakymas</span>
                </div>
                {user && user._id !== null && user._id === userId && (
                  <Button
                    className="smBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEdit(true);
                    }}
                  >
                    Redaguota
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
