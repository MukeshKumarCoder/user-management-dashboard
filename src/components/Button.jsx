import React from "react";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
