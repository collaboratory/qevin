import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import http from "axios";
import debounce from "debounce";
import styled from "styled-components";

import Paginator from "./Paginator";
import { Table, THead, TBody, Col, HCol, Row } from "./Table";
import { Input, Select } from "./Form";
import { Flex, Box } from "grid-styled";
import Loading from "./Loading";

const BaseContainer = styled.div`
  width: calc(100vw - 56px);
  height: calc(100vh - 96px);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  height: 42px;
  position: absolute;
  left: 0;
  top: 0;
  width: calc(100% - 2px);
  background: #efefef;
  border: 1px solid #ccc;
  z-index: 1;
`;

const Footer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 36px;
  width: calc(100% - 2px);
  background: #efefef;
  border: 1px solid #ccc;
  z-index: 1;
`;

const Content = styled.div`
  position: absolute;
  left: 0;
  top: 43px;
  height: calc(100% - 78px);
  width: 100%;
  overflow: auto;
`;

class DataTable extends Component {
  interval = false;
  state = {
    data: {},
    loading: true,
    sorting: {},
    filters: {},
    search: "",
    page: 1,
    pageSize: 25
  };

  componentDidMount() {
    if (this.props.status) {
      this.setState({
        status: this.props.status
      });
    }
    this.load();
    this.interval = setInterval(this.load, 5000);
  }

  componentWillReceiveProps({ status }) {
    if (status) {
      this.setState({
        status
      });
      this.load();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  load = debounce(() => {
    const { status, search, sorting, filters, page, pageSize } = this.state;
    const { endpoint } = this.props;
    const suffix = status ? `/${status}` : "";

    return http
      .get(endpoint + suffix, {
        params: {
          page,
          pageSize,
          search,
          sorting,
          filters
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
  }, 200);

  onSearchChange = e => {
    this.setState(
      {
        page: 1,
        loading: true,
        search: e.target.value
      },
      () => {
        if (this.props.onSearchChange) {
          this.props.onSearchChange(e);
        }
        this.load();
      }
    );
  };

  onStatusChange = e => {
    this.setState({
      status: e.target.value,
      loading: true
    });
    if (this.props.onStatusChange) {
      this.props.onStatusChange(e);
    }
  };

  onPageChange = page => {
    this.setState({ page, loading: true }, () => {
      this.load();
    });
  };

  formatCol(col, row) {
    return col.format ? col.format(row, col) : row[col.field];
  }

  sortToggle(field) {
    const { sorting } = this.state;
    sorting[field] = sorting[field] === "asc" ? "desc" : "asc";
    this.setState({
      sorting
    });
  }

  render() {
    const colCount = this.props.columns ? this.props.columns.length + 1 : 1;
    return (
      <BaseContainer loading={this.state.loading}>
        <Container>
          <Header>
            <Flex>
              <Box p={1}>
                <Input
                  label="Search"
                  type="text"
                  name="search"
                  value={this.state.search}
                  onChange={this.onSearchChange}
                />
              </Box>
              <Box p={1}>
                <Select
                  label="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onStatusChange}
                >
                  <option readOnly value="">
                    All Statuses
                  </option>
                  <option readOnly value="pending">
                    Pending
                  </option>
                  <option readOnly value="active">
                    Active
                  </option>
                  <option readOnly value="failed">
                    Failed
                  </option>
                  <option readOnly value="complete">
                    Complete
                  </option>
                </Select>
              </Box>
            </Flex>
          </Header>
          <Content>
            <Table
              fullHeight={this.state.loading}
              cellPadding={8}
              cellSpacing={0}
              border={1}
              width="100%"
            >
              <THead>
                <Row>
                  {this.props.columns.map(col => (
                    <HCol
                      key={`heading.${col.field}`}
                      width={col.width || "auto"}
                      onClick={e => this.sortToggle(col.field)}
                    >
                      {col.label}
                    </HCol>
                  ))}
                </Row>
              </THead>
              {this.state.loading ? (
                <TBody>
                  <tr>
                    <Col colSpan={colCount}>
                      <Loading />
                    </Col>
                  </tr>
                </TBody>
              ) : (
                <TBody>
                  {this.state.data.records && this.state.data.records.length ? (
                    [
                      this.state.data.records.map(
                        row =>
                          row ? (
                            <Row
                              key={`row.${row.id}`}
                              onClick={e =>
                                this.props.onRecordClick
                                  ? this.props.onRecordClick(row, e)
                                  : null}
                            >
                              {this.props.columns.map(col => (
                                <Col key={`row.${row.id}.${col.field}`}>
                                  {this.formatCol(col, row)}
                                </Col>
                              ))}
                            </Row>
                          ) : null
                      ),
                      <Row />
                    ]
                  ) : (
                    <Row>
                      <HCol colSpan={colCount}>
                        Oops! There are no records to display...
                      </HCol>
                    </Row>
                  )}
                </TBody>
              )}
            </Table>
          </Content>
          <Footer>
            <Paginator
              onPageChange={this.onPageChange}
              page={this.state.data.page}
              pages={this.state.data.pages}
            />
          </Footer>
        </Container>
      </BaseContainer>
    );
  }
}

export default withRouter(DataTable);
