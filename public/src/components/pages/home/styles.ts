// FormContainer.js
import styled from 'styled-components';

export const CenteringDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
    width: 70rem;
    height: 40rem;

    display: flex;

`;

export const ValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

export const Divider = styled.div`
  height: 100%;
  background-color: #ccc;
  margin: 0 20px;
  width: 1px;
`;

export const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


export const PageOneContainer = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const IndicatorContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const Circle = styled.div<{ active: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? '#008080' : '#e0e0e0')};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    color: white;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ active }) => (active ? '#007373' : '#c0c0c0')};
    }
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;
