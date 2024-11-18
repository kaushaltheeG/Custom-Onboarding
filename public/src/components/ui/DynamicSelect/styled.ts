import styled from "styled-components";
import { mobileOnly } from "../../../utils";

export const SelectContainer = styled.div`
  margin: 20px 0;
  overflow: visible;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

export const StyledSelect = styled.select<{ dynamicWidth: number }>`
  width: ${({ dynamicWidth }) => dynamicWidth}px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #033d03;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #fff url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE2IDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMCBsOCA4bDggLThsLTggLTgiIGZpbGw9IiMwMDAiLz48L3N2Zz4=') no-repeat right 10px center;

  &:focus {
    border-color: #52d752;
    outline: none;
  }

  ${mobileOnly`
    position: relative;
    z-index: 10;
    width: 100%;
  `}
`;
