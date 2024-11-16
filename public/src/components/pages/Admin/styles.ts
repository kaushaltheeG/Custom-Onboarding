import styled from "styled-components";

export const CenteringDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background-color: #c9e2c4;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 20px;
  width: 40rem;
  height: 20rem;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 20px;
  color: #333;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;