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

    return (
        <TextAreaContainer>
            <StyledLabel>{label}</StyledLabel>
            <StyledTextArea
                name={name}
                value={value}
                onChange={handleChange}
                isMaxReached={isMaxReached}
                maxLength={maxChars}
            />
            <CharCount isMaxReached={isMaxReached}>
                {value.length}/{maxChars}
            </CharCount>
        </TextAreaContainer>
    );
};

export default TextArea;