import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import "./Like.scss";

const Like = ({ likeCounter, userLikes, answerId }) => {
  const [likeCount, setLikeCount] = useState(likeCounter);
  const [btnLike, setBtnLike] = useState(false);
  const [btnDisike, setBtnDisike] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setBtnDisike(true);
      setBtnLike(true);
    }
  }, [user]);

  const increase = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    likeSubmit(newCount);
    setBtnDisike(false);
    setBtnLike(true);
  };

  const decrease = () => {
    const newCount = likeCount - 1;
    setLikeCount(newCount);
    likeSubmit(newCount);
    setBtnDisike(true);
    setBtnLike(false);
  };

  const likeSubmit = async (newCount) => {
    try {
      await axios.patch(`http://localhost:3000/answers/${answerId}/likes`, {
        userLikes: (user && [...userLikes, user._id]) || [],
        likeCounter: newCount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="counterContainer">
      <div>
        <Button className="smBtn likeBtn" onClick={increase} disabled={btnLike}>
          +
        </Button>
      </div>
      <div className="counter">{likeCount}</div>
      <div>
        <Button
          className="likeBtn smBtn"
          onClick={decrease}
          disabled={btnDisike}
        >
          -
        </Button>
      </div>
    </div>
  );
};
Like.propTypes = {
  likeCounter: PropTypes.number.isRequired,
  userLikes: PropTypes.arrayOf(PropTypes.string).isRequired,
  answerId: PropTypes.string.isRequired,
};

export default Like;
