import styled from 'styled-components';

export const InputContainer = styled.div`
    margin: 10px 0;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

