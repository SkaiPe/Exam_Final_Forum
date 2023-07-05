import Like from "./../../components/Like/Like";
import "./Answer.scss";

const Answer = ({ answer, children }) => {
  return (
    <div className="answer">
      <p>{answer}</p>
      {children}
    </div>
  );
};

export default Answer;
