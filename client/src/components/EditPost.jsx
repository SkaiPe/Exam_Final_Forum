import React from "react";
import Input from "./Input";
import axios from "axios";

const EditPost = ({ item, setEditedText, editedText }) => {
  const updateQuestion = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/question/${item._id}`, editedQuestion)
        .then(() => window.location.reload());
    } catch (error) {
      console.error(error);
    }
  };

  const editedQuestion = {
    text: editedText,
    edited: true,
  };

  return (
    <div>
      <div>
        <form onSubmit={updateQuestion}>
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Redaguojamą tekstą įveskite čia"
          />
          <button type="submit">Išaugoti</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
