import React, { useState } from "react";
import { InputContainer, StyledInput, StyledLabel } from "./styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, type = "text", ...props }) => {
  const [value, setValue] = useState<string>('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <InputContainer>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledInput 
            type={type} 
            value={value}
            onChange={handleChange}
            {...props} 
        />
    </InputContainer>
  );
};

export default Input;
