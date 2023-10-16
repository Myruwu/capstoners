import "./buttonStyle.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${props.variant} ${props.width}`}
    >
      {props.children}
    </button>
  );
};

export default Button;