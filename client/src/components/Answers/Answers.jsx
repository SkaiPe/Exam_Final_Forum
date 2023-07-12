import { useContext, useState } from "react";
import AnswerCard from "../Answer/AnswerCard";
import EditComment from "../Edit/EditComment/EditComment";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";

const Comments = ({
  isLoading,
  comments,
  updateComment,
  deleteComment,
  postId,
}) => {
  const { user } = useContext(UserContext);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleEditClick = (commentId) => {
    setSelectedCommentId(commentId);
  };

  const handleEditClose = () => {
    setSelectedCommentId(null);
  };

  return isLoading ? (
    <div>Loading</div>
  ) : (
    comments.map((comment) => (
      <div key={comment._id} className="cardContainer">
        {selectedCommentId === comment._id ? (
          user &&
          user._id !== null &&
          user._id === comment.userId && (
            <EditComment
              textValue={comment.text}
              id={comment._id}
              deleteComment={deleteComment}
              updateComment={updateComment}
              postId={postId}
              handleEditClose={handleEditClose}
            />
          )
        ) : (
          <div>
            <CommentCard
              id={comment._id}
              postId={postId}
              nickname={comment.nickname}
              dateCreated={comment.dateCreated}
              text={comment.text}
              edited={comment.edited}
              likeCounter={comment.likeCounter}
              userLikes={comment.userLikes}
            />

            {user && user._id !== null && user._id === comment.userId && (
              <Button
                className="smBtn"
                onClick={() => handleEditClick(comment._id)}
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>
    ))
  );
};
