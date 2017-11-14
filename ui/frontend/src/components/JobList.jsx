import React, { Component } from "react";
import DataTable from "./DataTable";

export default class JobList extends Component {
  onStatusChange = e => {
    this.props.history.push(`/jobs/${e.target.value}`);
  };

  render() {
    return <DataTable onStatusChange={this.onStatusChange} {...this.props} />;
  }
}
