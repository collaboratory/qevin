import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import styled, { injectGlobal, css } from "styled-components";

injectGlobal(css`
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: "Open Sans", "Menlo", sans-serif;
    font-size: 12px;
  }
`);

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  position: absolute;
`;

const Content = styled.div`
  margin: 20px;
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  border: 1px solid rgb(50, 75, 155);
  overflow: hidden;
`;

import Routes from "../routes";
import { Nav, NavLink } from "../components/Nav";

export default class App extends Component {
  render() {
    return (
      <Container>
        <HashRouter>
          <Content>
            <Nav>
              <NavLink to="/">Overview</NavLink>
              <NavLink to="/pending">Pending Jobs</NavLink>
              <NavLink to="/active">Active Jobs</NavLink>
              <NavLink to="/failed">Failed Jobs</NavLink>
              <NavLink to="/completed">Completed Jobs</NavLink>
              <NavLink to="/logs">Logs</NavLink>
            </Nav>
            <Routes />
          </Content>
        </HashRouter>
      </Container>
    );
  }
}
