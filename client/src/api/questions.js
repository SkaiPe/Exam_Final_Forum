import axios from "axios";

export const getAnswers = async (questionId) => {
  const response = await axios.get(
    `http://localhost:3000/questions/${questionId}/answers`
  );
  return response.data;
};

export const getQuestion = async (questionid) => {
  const response = await axios.get(
    `http://localhost:3000/questions/${questionid}`
  );
  return response.data;
};
