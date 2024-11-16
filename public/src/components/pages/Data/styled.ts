import styled from "styled-components";

export const TableContainer = styled.div`
  margin: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #6e9f6e;
  }

  th {
    background-color: #c9e2c4;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;
