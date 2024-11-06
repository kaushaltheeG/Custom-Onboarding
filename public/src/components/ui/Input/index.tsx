import React, { useState } from "react";
import { InputContainer, StyledInput } from "./styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; // Optional label
    type?: string; // Input type, defaults to "text"
}

const Input: React.FC<InputProps> = ({ label, type = "text", ...props }) => {
    const [value, setValue] = useState<string>(''); // Local state for input value

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value); // Update state with the input's current value
        if (props.onChange) {
            props.onChange(e); // Call any additional onChange handler passed as a prop
        }
    };

    return (
        <InputContainer>
            {label && <label>{label}</label>}
            <StyledInput 
                type={type} 
                value={value} // Controlled input value
                onChange={handleChange} // Handle input change
                {...props} 
            />
        </InputContainer>
    );
};

export default Input;
