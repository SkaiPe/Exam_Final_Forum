import React, { useState } from "react";
import "./LikeButton.css";

const LikeButton = () => {
  const [likeDisable, SetLikeDisable] = useState(false);
  const [dislikeDisable, SetdislikeDisable] = useState(false);

  return (
    <div>
      <button
        className="like"
        disabled={likeDisable}
        onClick={() => {
          SetLikeDisable(true);
          SetdislikeDisable(false);
        }}
      >
        Patinka
      </button>
      <button
        className="dislike"
        disabled={dislikeDisable}
        onClick={() => {
          SetLikeDisable(false);
          SetdislikeDisable(true);
        }}
      >
        Nepatinka
      </button>
    </div>
  );
};

export default LikeButton;
