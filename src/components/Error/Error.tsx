import React from "react";
import "./Error.css";

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = "Something went wrong. Please try again.",
}) => {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorComponent;
