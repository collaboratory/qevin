import React from "react";
import styled from "styled-components";
import { RotaingPlaneLoading } from "styled-spinkit";

const Container = styled.div`
  text-align: center;

  span {
    position: relative;
    top: 156px;
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.45);
    z-index: 1;
  }
`;

export default () => {
  return (
    <Container>
      <span>LOADING</span>
      <RotaingPlaneLoading color="#ddd" size={100} />
    </Container>
  );
};
