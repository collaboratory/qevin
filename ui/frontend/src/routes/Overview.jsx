import React, { Component } from "react";
import http from "axios";
import { Table, THead, TBody, Row, Col, HCol } from "../components/Table";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Overview extends Component {
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
          <Table cellPadding={8} cellSpacing={0} border={1}>
            <TBody>
              <Row>
                <HCol>Next Job ID</HCol>
                <Col>{this.state.data.index}</Col>
              </Row>
              <Row onClick={e => this.props.history.push("/pending")}>
                <HCol>Pending Jobs</HCol>
                <Col>{this.state.data.pending}</Col>
              </Row>
              <Row onClick={e => this.props.history.push("/active")}>
                <HCol>Active Jobs</HCol>
                <Col>{this.state.data.active}</Col>
              </Row>
              <Row onClick={e => this.props.history.push("/failed")}>
                <HCol>Failed Jobs</HCol>
                <Col>{this.state.data.failed}</Col>
              </Row>
              <Row onClick={e => this.props.history.push("/completed")}>
                <HCol>Completed Jobs</HCol>
                <Col>{this.state.data.complete}</Col>
              </Row>
              <Row onClick={e => this.props.history.push("/workers")}>
                <HCol>Workers</HCol>
                <Col>{this.state.data.workers}</Col>
              </Row>
            </TBody>
          </Table>
        )}
      </div>
    );
  }
}
export default withRouter(Overview);
