import styled from 'styled-components';

export const InputContainer = styled.div`
    margin: 10px 0;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 2px solid #033d03;
    font-size: 16px;
    border-radius: 5px;
    transition: border-color 0.3s, box-shadow 0.3s;
    
    &:focus {
      border-color: #52d752;
      outline: none;
    }
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;
