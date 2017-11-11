import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  padding: 8px 20px;
  line-height: 40px;
  font-weight: bold;
  text-decoration: none;
  color: white;
  margin-right: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const NavBrand = styled.h1`
  padding: 8px 30px 8px 20px;
  line-height: 22px;
  font-size: 18px;
  font-weight: bold;
  display: inline-block;
  margin: 0;
  float: left;
`;

export const Nav = styled.div`
  width: 100%;
  background-color: rgb(50, 75, 155);
  color: white;
  height: 42px;
  text-align: right;
`;
