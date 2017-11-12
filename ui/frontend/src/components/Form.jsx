import React, { Component } from "react";
import styled from "styled-components";

export const InputContainer = styled.div`line-height: 24px;`;
export const Label = styled.label`
  padding: 0 20px 0 0;
  font-weight: bold;
`;
export const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 4px 8px;
`;

export const Input = ({ name, label, value, onChange, ...props }) => {
  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput name={name} value={value} onChange={onChange} {...props} />
    </InputContainer>
  );
};
