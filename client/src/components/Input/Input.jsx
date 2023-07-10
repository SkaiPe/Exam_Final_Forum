import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ className, ...props }) => {
  return <input className={`styled-input ${className}`} {...props} />;
};
Input.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["contained", "outlined"]),
  color: PropTypes.oneOf(["", "error", "success"]),
};

Input.defaultProps = {
  className: "",
  variant: "contained",
  color: "",
};

export default Input;
