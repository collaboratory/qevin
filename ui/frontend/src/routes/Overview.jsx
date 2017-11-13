import React, { Component } from "react";
import http from "axios";
import styled from "styled-components";
import Loading from "../components/Loading";
import { Table, THead, TBody, Row, Col, HCol } from "../components/Table";
import { Flex, Box } from "grid-styled";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const StatusColor = styled.span`
  color: ${props =>
    !props.ping ? "red" : props.ping > 150 ? "orange" : "green"};
`;

const StatusHeading = styled.h1`
  margin-top: 80px;
  font-size: 36px;
  text-align: center;
`;

const Status = ({ ping }) => (
  <StatusHeading>
    Service Status:{" "}
    <StatusColor ping={ping}>{ping ? "Online" : "Offline"}</StatusColor>
  </StatusHeading>
);

class Overview extends Component {
  interval = false;
  state = {
    loading: true
  };

  componentDidMount() {
    this.loadStatus();
    this.interval = setInterval(this.loadStatus, 5000);
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
          <Loading />
        ) : (
          <Flex>
            <Box width={1 / 4}>
              <Table cellPadding={8} cellSpacing={0} border={1} width="100%">
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
            </Box>
            <Box width={3 / 4}>
              <Status ping={this.state.data.ping} />
            </Box>
          </Flex>
        )}
      </div>
    );
  }
}
export default withRouter(Overview);
