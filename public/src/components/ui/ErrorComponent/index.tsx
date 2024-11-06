import React from "react";
import { ErrorContainer } from "./styles";

interface ErrorMessageProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <ErrorContainer>
      {message}
    </ErrorContainer>
  );
};

export default ErrorComponent;
