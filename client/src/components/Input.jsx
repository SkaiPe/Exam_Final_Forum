import "./Input.css";

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
