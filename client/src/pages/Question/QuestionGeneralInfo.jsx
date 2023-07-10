import PropTypes from "prop-types";
import "./Project.scss";
// TODO write PropTypes for project

const QuestionGeneralInfo = ({ question }) => {
  const { name, post, imageUrl } = question;

  return (
    <div>
      <h1>{name}</h1>
      <p>Klausimas: {post}</p>
      <img src={imageUrl} alt={post} />
    </div>
  );
};
QuestionGeneralInfo.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string.isRequired,
    post: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionGeneralInfo;
