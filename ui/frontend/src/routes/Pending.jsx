import React, { Component } from "react";
import http from "axios";

import JobList from "../components/JobList";

export default class Pending extends Component {
  render() {
    return (
      <JobList
        columns={[
          {
            field: "type",
            label: "Type"
          },
          {
            field: "priority",
            label: "Priority"
          }
        ]}
        endpoint="/api/jobs/pending"
      />
    );
  }
}
