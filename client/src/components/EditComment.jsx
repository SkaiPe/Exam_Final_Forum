import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";

const EditComment = ({ item }) => {
  const [editedTextComment, setEditedComment] = useState("");

  const updateComment = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/answers/${item._id}`, editedQuestion)
        .then(() => window.location.reload());
    } catch (error) {
      console.error(error);
    }
  };

  const editedQuestion = {
    text: editedTextComment,
    edited: true,
  };

  return (
    <div>
      <div>
        <form onSubmit={updateComment}>
          <Input
            value={editedTextComment}
            onChange={(e) => setEditedComment(e.target.value)}
            placeholder="Redaguojamą tekstą įveskite čia"
          />
          <button type="submit">Išaugoti</button>
        </form>
      </div>
    </div>
  );
};

export default EditComment;
