// FormContainer.js
import styled from 'styled-components';
import { mobileOnly } from '../../../utils';

export const CenteringDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.span`
  display: block;
  margin-top: 15px;
  margin-left: 20px;
  font-size: 26px;
  color: #333;
`;

export const FormContainer = styled.div`
  background-color: #c9e2c4;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 100%;
  height: 30rem;
  display:flex;

  ${mobileOnly`
    flex-direction: column;
    height: auto;
  `}
`;

export const ValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  ${mobileOnly`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 20px;
  `}
`;

export const Divider = styled.div`
  height: 100%;
  background-color: #ccc;
  margin: 0 20px;
  width: 1px;

  ${mobileOnly`
    display: none;
  `
  }
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
  background-color: ${({ active }) => (active ? '#84a785' : '#e0e0e0')};
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

export const BirthdayContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;

  ${mobileOnly`
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    height: auto;
  `}
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

export const PageTwoAndThreeContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  gap: 100px;

  ${mobileOnly`
    gap: 0px;
  `}
`;

export const ColumnAlign = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  align-items: flex-start;
  padding: 10px;
`;

export const RowAlign = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  padding-left: 50px;

  ${mobileOnly`
    justify-content: center;
    padding-left: 0px;
  `}
`;

export const FixedWidth = styled.div`
  width: 60rem;
  ${mobileOnly`
    width: auto;
  `}
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 20px;
  overflow: hidden;

  ${mobileOnly`
    padding-bottom: 60px;
  `}
`;


export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;

  ${mobileOnly`
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    padding: 0px;
  `}
`;
