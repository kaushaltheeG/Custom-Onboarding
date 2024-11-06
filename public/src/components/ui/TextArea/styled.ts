import styled from "styled-components";

export const TextAreaContainer = styled.div`
    position: relative;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100px;
`;

export const StyledLabel = styled.label`
    position: absolute;
    top: -10px;
    left: 0;
    font-size: 14px;
    color: #333;
`;

export const StyledTextArea = styled.textarea<{ isMaxReached: boolean }>`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid ${({ isMaxReached }) => (isMaxReached ? 'red' : '#ccc')};
    border-radius: 4px;
    resize: none;
    margin-top: 5px;
    &:focus {
        border-color: #008080;
    }
`;

export const CharCount = styled.div<{ isMaxReached: boolean }>`
    position: absolute;
    bottom: -20px;
    right: 0;
    font-size: 12px;
    color: ${({ isMaxReached }) => (isMaxReached ? 'red' : '#555')};
`;
