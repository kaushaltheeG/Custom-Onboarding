import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #6e9f6e;
    vertical-align: top;
  }

  th {
    background-color: #c9e2c4;
    white-space: nowrap;
    max-width: 150px;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-word;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 8px; /* Reduce padding for smaller screens */
      font-size: 14px; /* Adjust font size to prevent overflow */
    }
  }
`;
