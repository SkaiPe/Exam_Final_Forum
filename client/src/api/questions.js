import axios from "axios";

export const getQuestion = async (questionId) => {
  const response = await axios.get(
    `http://localhost:3000/question/${questionId}`
  );
  return response.data;
};
