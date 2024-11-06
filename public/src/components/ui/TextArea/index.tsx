import React from 'react';
import { CharCount, StyledLabel, StyledTextArea, TextAreaContainer } from './styled';

interface TextAreaProps {
    label: string;
    maxChars: number;
    value: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextArea: React.FC<TextAreaProps> = ({ label, maxChars, value, handleChange, name }) => {
    const isMaxReached = value.length >= maxChars;

    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const newValue = e.target.value;
    //     if (newValue.length <= maxChars) {
    //         onChange(newValue);
    //     }
    // };

    return (
        <TextAreaContainer>
            <StyledLabel>{label}</StyledLabel>
            <StyledTextArea
                name={name}
                value={value}
                onChange={handleChange}
                isMaxReached={isMaxReached}
                maxLength={maxChars} // This limits the input length in the textarea
            />
            <CharCount isMaxReached={isMaxReached}>
                {value.length}/{maxChars}
            </CharCount>
        </TextAreaContainer>
    );
};

export default TextArea;