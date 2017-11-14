import React, { Component } from "react";
import moment from "moment";
import axios from "axios";

import JobList from "../components/JobList";

export default class Logs extends Component {
  state = {
    logs: [],
    loading: true
  };

  render() {
    return (
      <JobList
        columns={[
          {
            field: "pid",
            label: "PID"
          },
          {
            field: "name",
            label: "Application"
          },
          {
            field: "hostname",
            label: "Hostname"
          },
          {
            field: "level",
            label: "Level"
          },
          {
            field: "timestamp",
            label: "Timestamp",
            format: f => moment(f["@timestamp"]).format("h:mm:ssA MM/DD/YYYY")
          },
          {
            field: "message",
            label: "Message"
          }
        ]}
        endpoint="/api/logs"
      />
    );
  }
}
