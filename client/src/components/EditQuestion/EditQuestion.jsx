import { useState } from "react";
import axios from "axios";
import Input from "../../Input/Input";
import TextareaItem from "../../TextareaItem/TextareaItem";
import Button from "../../Button/Button";
import { currentTime } from "../../../utils/fullDate";
import "./EditAnswer.scss";

const EditQuestion = ({ questionId, post, text, showEdit, setShowEdit }) => {
  const [editedPost, setEditedPost] = useState(post);
  const [editedQuestionText, setEditedQuestionText] = useState(text);

  const editedQuestion = {
    title: editedPost,
    text: editedQuestionText,
    edited: true,
    dateCreated: currentTime(),
  };

  // klausimo redagavimas
  const editingQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/questions/${questionId}`, editedQuestion)
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error(error);
    }
    setShowEdit(false);
  };

  const deleteQuestion = async () => {
    try {
      await axios
        .delete(`http://localhost:3000/question/${questionId}`)
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {showEdit ? (
        <form onSubmit={editingQuestion}>
          <Input
            type="text"
            required
            value={editedPost}
            onChange={(e) => setEditedPost(e.target.value)}
          />
          <TextareaItem
            rows="10"
            cols="50"
            type="text"
            required
            value={editedQuestionText}
            onChange={(e) => setEditedQuestionText(e.target.value)}
          />
          <div className="btnsContainer">
            <div>
              <Button className="mdBtn" type="submit">
                IŠSAUGOTI
              </Button>
              <Button
                className="mdBtn"
                type="button"
                onClick={() => setShowEdit(false)}
              >
                ATŠAUKTI
              </Button>
            </div>
            <Button className="btnDelete" type="button" onClick={deletePost}>
              IŠTRINTI
            </Button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditQuestion;
