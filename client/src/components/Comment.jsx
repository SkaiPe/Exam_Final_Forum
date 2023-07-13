import React, { useContext, useState } from "react";
import axios from "axios";
import EditComment from "./EditComment";
import { UserContext } from "../context/UserContext";
import LikeButton from "./LikeButton";

const Comment = ({ item }) => {
  const { user } = useContext(UserContext);
  const [editComment, setEditComment] = useState(false);

  const deletePost = async () => {
    try {
      await axios
        .delete(`http://localhost:3000/answers/${item._id}`)
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>Vartotojas: {item.name}</div>
      <div>Sukurta:{item.date}</div>
      <div>{item.text}</div>
      <div>{item.edited ? "Redaguota" : ""}</div>
      {user && (
        <div>
          <LikeButton />
          <button onClick={deletePost}>Ištrinti</button>
          <button onClick={() => setEditComment(true)}>Redaguoti</button>
          {editComment ? <EditComment item={item} /> : ""}
        </div>
      )}
    </div>
  );
};

export default Comment;
