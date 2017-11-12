import React from "react";
import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #ccc;
  border-right: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin: 0;
  padding: 0;
  word-break: break-word;
`;

export const Row = styled.tr`
  cursor: pointer;
  background: ${props => (props.tinted ? "#ececec" : "#fff")};
`;
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
  white-space: normal;
  word-wrap: break-word;
`;

export const HCol = Col.extend`font-weight: bold;`;
