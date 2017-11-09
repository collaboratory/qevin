import React from "react";
import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #ccc;
  border-right: none;
  margin: 8px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

export const Row = styled.tr`cursor: pointer;`;
export const TBody = styled.tbody`
  ${Row}:hover {
    background: #eee;
  }
`;
export const THead = styled.thead``;

export const Col = styled.td`
  padding: 8px 20px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
`;

export const HCol = Col.extend`font-weight: bold;`;
