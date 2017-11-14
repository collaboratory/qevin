import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Overview from "./Overview";
import Job from "./Job";
import Jobs from "./Jobs";
import Logs from "./Logs";

const Wrapper = styled.div`
  padding: 8px;
  font-size: 14px;
  width: calc(100% - 16px);
  height: calc(100% - 59px);
  overflow: auto;
`;

export default () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Overview} />
      <Route path="/job/:id" component={Job} />
      <Route path="/jobs/:status?" component={Jobs} />
      <Route path="/logs/:range?" component={Logs} />
    </Switch>
  </Wrapper>
);
