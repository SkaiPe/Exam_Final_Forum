import "./Input.css";

const Input = ({ type, value, onChange, placeholder, ...props }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
