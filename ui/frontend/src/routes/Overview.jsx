import React, { Component } from "react";
import http from "axios";

export default class Overview extends Component {
  interval = false;
  state = {
    loading: true
  };

  componentDidMount() {
    this.loadStatus();
    this.interval = setInterval(this.loadStatus, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadStatus = () => {
    return http
      .get("/api/status")
      .then(res => {
        const { data } = res;
        this.setState({
          loading: false,
          data
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <strong>Loading</strong>
        ) : (
          <table cellPadding={8} cellSpacing={0} border={1}>
            <tbody>
              <tr>
                <th>Next Job ID</th>
                <td>{this.state.data.index}</td>
              </tr>
              <tr>
                <th>Pending Jobs</th>
                <td>{this.state.data.pending}</td>
              </tr>
              <tr>
                <th>Active Jobs</th>
                <td>{this.state.data.active}</td>
              </tr>
              <tr>
                <th>Failed Jobs</th>
                <td>{this.state.data.failed}</td>
              </tr>
              <tr>
                <th>Completed Jobs</th>
                <td>{this.state.data.complete}</td>
              </tr>
              <tr>
                <th>Workers</th>
                <td>{this.state.data.workers}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
