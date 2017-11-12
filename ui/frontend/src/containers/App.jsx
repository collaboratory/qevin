import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import styled, { injectGlobal, css } from "styled-components";
import reset from "styled-reset";

import { Nav, NavLink, NavBrand } from "../components/Nav";
import Routes from "../routes";

const baseStyles = () =>
  injectGlobal`
    ${reset};

    html,
    body {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      font-family: "Open Sans", "Menlo", sans-serif;
      font-size: 12px;
      overflow: hidden;
    }

    #app {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  position: absolute;
`;

const Content = styled.div`
  background-color: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  border: 1px solid rgb(50, 75, 155);
  margin: 20px;
  width: calc(100% - 40px);
  max-height: calc(100% - 40px);
  position: relative;
`;

export default class App extends Component {
  render() {
    baseStyles();
    return (
      <Container>
        <HashRouter>
          <Content>
            <Nav>
              <NavBrand>ThanQueue</NavBrand>
              <NavLink to="/">Overview</NavLink>
              <NavLink to="/jobs/pending">Pending Jobs</NavLink>
              <NavLink to="/jobs/active">Active Jobs</NavLink>
              <NavLink to="/jobs/failed">Failed Jobs</NavLink>
              <NavLink to="/jobs/complete">Completed Jobs</NavLink>
              <NavLink to="/logs">Logs</NavLink>
            </Nav>
            <Routes />
          </Content>
        </HashRouter>
      </Container>
    );
  }
}
