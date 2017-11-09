import React, { Component } from "react";
import http from "axios";
import moment from "moment";

import JobList from "../components/JobList";

export default class Completed extends Component {
  render() {
    return (
      <JobList
        columns={[
          {
            field: "type",
            label: "Type"
          },
          {
            field: "data.started_at",
            label: "Start Time",
            format: f => moment.unix(f).format("h:m:ssA MM/DD/YYYY")
          },
          {
            field: "data.completed_at",
            label: "End Time",
            format: f => moment.unix(f).format("h:m:ssA MM/DD/YYYY")
          }
        ]}
        endpoint="/api/jobs/complete"
      />
    );
  }
}
