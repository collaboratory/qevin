import React, { Component } from "react";
import styled from "styled-components";
import { Input } from "./Form";

const Container = styled.div`
  line-height: 16px;
  position: relative;
`;

const Page = styled.div`
  display: inline-block;
  padding: 4px 10px;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  color: ${props => (props.active ? "blue" : "black")};
  user-select: none;
`;

const Left = styled.div`
  float: left;
  width: 33%;
`;

const Center = styled.div`
  float: left;
  width: 33%;
  line-height: 18px;
  text-align: center;
`;

const InputContainer = styled.div`
  line-height: 35px;
  display: inline-block;
`;

const Right = styled.div`
  float: right;
  width: 33%;
  text-align: right;
`;

export default class Paginator extends Component {
  setPage(page) {
    if (!page || isNaN(page)) {
      page = "";
    }

    this.setState({
      page
    });

    if (this.props.onPageChange) {
      return this.props.onPageChange(page);
    }
  }

  onPageInput = e => {
    return this.setPage(parseInt(e.target.value));
  };

  componentWillMount() {
    this.setState({
      page: this.props.page
    });
  }

  render() {
    const left = [];
    const right = [];

    // Populate the pages on the left
    for (let i = 1; i <= Math.min(3, this.props.pages); i++) {
      left.push(i);
    }

    // If there are more than 3 pages, populate the pages on the right
    if (this.props.pages > 3) {
      for (
        let i = Math.max(4, this.props.pages - 3);
        i <= this.props.pages;
        i++
      ) {
        right.push(i);
      }
    }

    return (
      <Container>
        <Left>
          {left.map(num => (
            <Page
              key={num}
              active={num === this.props.page}
              onClick={e => this.setPage(num)}
            >
              {num}
            </Page>
          ))}
        </Left>
        <Center>
          {this.props.page > 1 ? (
            <Page onClick={e => this.setPage(this.props.page - 1)}>
              Previous
            </Page>
          ) : null}
          <InputContainer>
            <Input
              type="text"
              value={this.state.page}
              onChange={this.onPageInput}
            />
          </InputContainer>
          {this.props.pages > this.props.page ? (
            <Page onClick={e => this.setPage(this.props.page + 1)}>Next</Page>
          ) : null}
        </Center>
        <Right>
          {right.map(num => (
            <Page
              key={num}
              active={num === this.props.page}
              onClick={e => this.setPage(num)}
            >
              {num}
            </Page>
          ))}
        </Right>
      </Container>
    );
  }
}
