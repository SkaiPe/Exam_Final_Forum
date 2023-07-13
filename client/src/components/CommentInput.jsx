import Input from "./Input";

const CommentInput = ({
  commentSubmit,
  setQustionId,
  item,
  setAnswerInputId,
  comment,
  setComment,
}) => {
  return (
    <form onSubmit={commentSubmit}>
      <button
        type="submit"
        onClick={() => {
          setQustionId(item._id);
          setAnswerInputId(-1);
        }}
      >
        Atsakyti
      </button>

      <Input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Įveskite savo atsakymą čia..."
      />
    </form>
  );
};

export default CommentInput;
