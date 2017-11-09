import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import http from "axios";

import Paginator from "./Paginator";
import { Table, THead, TBody, Col, HCol, Row } from "./Table";

class JobList extends Component {
  interval = false;
  state = {
    data: {},
    loading: true,
    sorting: {},
    filters: {}
  };

  componentDidMount() {
    this.loadJobs();
    this.interval = setInterval(this.loadJobs, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadJobs = (page = null) => {
    return http
      .get(this.props.endpoint, {
        params: {
          page: parseInt(page ? page : this.state.data.page || 1),
          pageSize: parseInt(this.props.pageSize || 25),
          sorting: this.state.sorting,
          filters: this.state.filters
        }
      })
      .then(res => {
        const { data } = res;
        data.page = parseInt(data.page);
        data.pages = parseInt(data.pages);
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

  formatCol(col, value) {
    return col.format ? col.format(value) : value;
  }

  sortToggle(field) {
    const { sorting } = this.state;
    sorting[field] = sorting[field] === "asc" ? "desc" : "asc";
    this.setState({
      sorting
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <strong>Loading</strong>
        ) : (
          <div>
            <Table cellPadding={8} cellSpacing={0} border={1}>
              <THead>
                <Row>
                  <HCol onClick={e => this.sortToggle("id")}>Job ID</HCol>
                  {this.props.columns.map(col => (
                    <HCol
                      key={col.field}
                      onClick={e => this.sortToggle(col.field)}
                    >
                      {col.label}
                    </HCol>
                  ))}
                </Row>
              </THead>
              <TBody>
                {this.state.data.records && this.state.data.records.length ? (
                  this.state.data.records.map(
                    job =>
                      job ? (
                        <Row
                          key={job.id}
                          onClick={e => {
                            this.props.history.push(`/job/${job.id}`);
                          }}
                        >
                          <HCol>{job.id}</HCol>
                          {this.props.columns.map(col => (
                            <Col key={`${col.field}.${job.id}`}>
                              {this.formatCol(col, get(job, col.field))}
                            </Col>
                          ))}
                        </Row>
                      ) : null
                  )
                ) : (
                  <Row>
                    <HCol colSpan={this.props.columns.length + 1}>
                      Oops! There are no records to display...
                    </HCol>
                  </Row>
                )}
              </TBody>
            </Table>
            {this.state.data.records && this.state.data.records.length ? (
              <Paginator
                onPageChange={page => this.loadJobs(page)}
                page={this.state.data.page}
                pages={this.state.data.pages}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(JobList);
