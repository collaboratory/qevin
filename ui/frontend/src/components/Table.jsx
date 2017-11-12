import React from "react";
import styled from "styled-components";

export const Table = styled.table`
  height: ${props => (props.fullHeight ? "100%" : "auto")};
  border: 1px solid #ccc;
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
  white-space: normal;
  word-wrap: break-word;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  line-height: 24px;
  max-height: 48px;
`;

export const HCol = Col.extend`font-weight: bold;`;
