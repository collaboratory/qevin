import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  padding: 8px 20px;
  line-height: 24px;
  font-weight: bold;
  text-decoration: none;
  color: white;
`;

export const Nav = styled.div`
  width: 100%;
  background-color: rgb(50, 75, 155);
  color: white;
`;
