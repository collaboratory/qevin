import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Overview from "./Overview";
import Pending from "./Pending";
import Active from "./Active";
import Failed from "./Failed";
import Completed from "./Completed";
import Job from "./Job";

const Wrapper = styled.div`
  padding: 8px;
  font-size: 14px;
`;

export default () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Overview} />
      <Route exact path="/pending" component={Pending} />
      <Route exact path="/active" component={Active} />
      <Route exact path="/failed" component={Failed} />
      <Route exact path="/completed" component={Completed} />
      <Route path="/job/:id" component={Job} />
    </Switch>
  </Wrapper>
);
