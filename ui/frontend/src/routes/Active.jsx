import React, { Component } from "react";
import http from "axios";
import moment from "moment";

import JobList from "../components/JobList";

export default class Active extends Component {
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
            field: "retries",
            label: "Retries"
          },
          {
            field: "started_at",
            label: "Start Time",
            format: f => moment.unix(f).fromNow()
          }
        ]}
        endpoint="/api/jobs/active"
      />
    );
  }
}
