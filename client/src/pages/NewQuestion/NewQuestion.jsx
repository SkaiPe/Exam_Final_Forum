import { useContext, useState } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormItem from "../../components/FormItem/FormItem";
import { UserContext } from "../../context/UserContext";
import { createQuestion, updateQuestion } from "../../api/questions";
import { QUESTIONS_ROUTE, QUESTION_ROUTE } from "../../routes/const";

// TODO write PropTypes from project;

const NewQuestion = ({ post }) => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState(question?.question || "");
  const [imageUrl, setImageUrl] = useState(question?.imageUrl || "");

  const isEditing = !!question;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittingQuestion = {
      userId: user.id,
      post,
      imageUrl,
    };

    const saveQuestion = isEditing ? updateQuestion : createQuestion;
    const savingQuestion = isEditing
      ? { id: question.id, ...submittingQuestion }
      : submittingQuestion;

    saveQuestion(savingQuestion)
      .then(() => {
        const route = isEditing
          ? generatePath(QUESTION_ROUTE, { id: question.id })
          : QUESTIONS_ROUTE;
        navigate(route);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormItem
        type="text"
        label="Post"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <FormItem
        type="url"
        label="Image ULR"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Button>{isEditing ? "Edit" : "Create"} Klausti</Button>
    </form>
  );
};

export default NewQuestion;
