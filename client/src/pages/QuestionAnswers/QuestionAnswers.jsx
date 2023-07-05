import { useState } from "react";
import Answer from "../../components/Answer/Answer";
import Like from "../../components/Like/Like";
import { formatDate } from "./../../utils/formater";
import { getAnswers } from "../../api/answers";

const QuestionAnswers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");
  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    setActiveBtn("like");
  };

  const handleDislikeClick = () => {
    setDislikeCount(dislikeCount + 1);
    setActiveBtn("dislike");
  };
  return (
    <div>
      <Answer answer="Taip, lijo.">
        <Like
          onClickLike={handleLikeClick}
          onClickDislike={handleDislikeClick}
          activeBtn={activeBtn}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
        />
      </Answer>
    </div>
  );
};

export default QuestionAnswers;
