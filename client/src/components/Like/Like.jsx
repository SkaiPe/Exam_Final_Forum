import { SlLike, SlDislike } from "react-icons/sl";
import "./Like.scss";

const Like = ({
  onClickLike,
  onClickDislike,
  activeBtn,
  likeCount,
  dislikeCount,
}) => {
  return (
    <div className="ld-container">
      <div className="ld-group">
        <SlLike
          onClick={onClickLike}
          className={`like-icon ${activeBtn === "like" ? "like-active" : ""}`}
        />
        <div className="count">{likeCount}</div>
      </div>
      <div className="ld-group">
        <SlDislike
          onClick={onClickDislike}
          className={`dislike-icon ${
            activeBtn === "dislike" ? "dislike-active" : ""
          }`}
        />
        <div className="count">{dislikeCount}</div>
      </div>
    </div>
  );
};

export default Like;
