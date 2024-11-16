import styled from 'styled-components';

export const ButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #57a05b;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1f8124;
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      background-color: #c8e6c9;
      cursor: not-allowed;
    }
`;
