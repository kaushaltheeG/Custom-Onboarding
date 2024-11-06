import styled from 'styled-components';

export const ButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;