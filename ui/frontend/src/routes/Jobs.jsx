import React, { Component } from "react";
import http from "axios";
import moment from "moment";

import JobList from "../components/JobList";

export default class Jobs extends Component {
  render() {
    const { match } = this.props;
    return (
      <JobList
        status={match.params.status || null}
        columns={[
          {
            field: "type",
            label: "Type"
          },
          {
            field: "status",
            label: "Status"
          },
          {
            field: "data.started_at",
            label: "Start Time",
            format: f => moment(f.started_at).format("h:mm:ssA MM/DD/YYYY")
          },
          {
            field: "data.completed_at",
            label: "End Time",
            format: f => moment(f.completed_at).format("h:mm:ssA MM/DD/YYYY")
          },
          {
            feld: "data.result",
            label: "Result",
            width: "50%",
            format: f => JSON.stringify(f.result).substr(0, 55)
          }
        ]}
        endpoint="/api/jobs"
      />
    );
  }
}
