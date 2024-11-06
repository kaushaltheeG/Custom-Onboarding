import React from "react";
import { ButtonContainer } from "./styled";

interface IRoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode | undefined;
}

const RoundedButton: React.FC<IRoundedButtonProps>= ({ onClick, disabled, children }) => {
    return (
        <ButtonContainer onClick={onClick} disabled={disabled}>
            {children}
        </ButtonContainer>
    );
};

export default RoundedButton;