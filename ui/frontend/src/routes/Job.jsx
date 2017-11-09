import React, { Component } from "react";
import http from "axios";
import styled from "styled-components";
import JSONTree from "react-json-tree";
import moment from "moment";

const TreeContainer = styled.div`
  padding: 4px 10px;
  background: rgb(0, 43, 54);
`;

export default class Job extends Component {
  interval = false;
  state = {
    loading: true
  };

  componentDidMount() {
    this.load();
    this.interval = setInterval(this.load, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  load = () => {
    return http
      .get(`/api/job/${this.props.match.params.id}`)
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
    if (this.state.loading) {
      return <strong>Loading</strong>;
    }

    const { id, type, status, data } = this.state.data;
    const { result, started_at, completed_at } = data ? data : this.state.data;

    return (
      <div>
        <h1>Job #{id}</h1>
        <h2>Type: {type}</h2>
        <h3>Status: {status}</h3>
        <div>
          <hr />
          <h4>Data</h4>
          <TreeContainer>
            <JSONTree data={data.data ? data.data : data} />
          </TreeContainer>
        </div>
        {status === "complete" ? (
          <div>
            <hr />
            <h4>Result</h4>
            <TreeContainer>
              <JSONTree data={result} />
            </TreeContainer>
            <hr />
            <div>
              <strong>Completed at</strong>
              &nbsp;
              <em>{moment.unix(completed_at).format("h:mmA")}</em>
              &nbsp;
              <strong>on</strong>
              &nbsp;
              <em>{moment.unix(completed_at).format("MM/DD/YYYY")}</em>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
