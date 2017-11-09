import React, { Component } from "react";
import http from "axios";

import JobList from "../components/JobList";

export default class Failed extends Component {
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
          },
          {
            field: "started_at",
            label: "Start Time",
            format: f => moment.unix(f).fromNow()
          }
        ]}
        endpoint="/api/jobs/failed"
      />
    );
  }
}
