import styled from "styled-components";

export const SelectContainer = styled.div`
  margin: 20px 0; // Adjust margin as needed
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

export const StyledSelect = styled.select<{ dynamicWidth: number }>`
  width: ${({ dynamicWidth }) => dynamicWidth}px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #008080; // Change border color on focus
    outline: none; // Remove default outline
  }
`;
