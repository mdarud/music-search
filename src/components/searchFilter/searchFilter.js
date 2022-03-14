import React, { Component } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { search } from "../../utils/api";
import SearchResults from "../searchResults/searchResults";
import "./searchFilter.css";

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      value: "",
      filter: "track",
    };
    this.limit = 30;

    this.handleChange = this.handleChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.incLimit = this.incLimit.bind(this);
  }

  search = async (val, filter) => {
    this.setState({ loading: true });
    var results = null;
    if (filter === "artist") {
      results = await search(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&limit=${this.limit}&artist=${val}&api_key=841704413b89e721e85e0cdb2d86b997&format=json`
      );
    } else {
      results = await search(
        `http://ws.audioscrobbler.com/2.0/?method=track.search&limit=${this.limit}&track=${val}&api_key=841704413b89e721e85e0cdb2d86b997&format=json`
      );
    }
    const data = results;
    this.setState({ data, loading: false });
  };

  componentDidMount() {
    document.title = "Search | MusicBase";
  }

  onChangeHandler = async (e) => {
    this.limit = 30;
    this.search(e.target.value, this.state.filter);
    this.setState({ value: e.target.value });
  };

  handleChange = async (e) => {
    this.limit = 30;
    let filter = e.target.value;
    this.search(this.state.value, filter);
    this.setState({ filter });
    console.log(filter);
    console.log(this.state);
  };

  incLimit = () => {
    this.limit = this.limit + 30;
    this.search(this.state.value, this.state.filter);
  };

  get renderData() {
    let data = (
      <h1
        style={{
          marginTop: "30px",
          paddingLeft: "12px",
          textAlign: "center",
          fontFamily: "monospace",
        }}
      >
        No search result :(
      </h1>
    );
    if (this.state.data) {
      let max =
        this.state.data["opensearch:totalResults"] > 1000
          ? 1000
          : this.state.data["opensearch:totalResults"];
      if (this.state.data.trackmatches) {
        data = (
          <div>
            <h3
              style={{
                marginTop: "20px",
                paddingLeft: "12px",
                fontFamily: "monospace",
              }}
            >
              Track Results ({max} Tracks):
            </h3>
            <SearchResults results={this.state.data.trackmatches.track} />
          </div>
        );
      } else {
        console.log(this.state.data);
        data = (
          <div>
            <h3
              style={{
                marginTop: "20px",
                paddingLeft: "12px",
                fontFamily: "monospace",
              }}
            >
              Artist Results ({max} Artists):
            </h3>
            <SearchResults results={this.state.data.artistmatches.artist} />
          </div>
        );
      }
    }

    return data;
  }

  get renderMore() {
    let el = <div></div>;
    if (this.state.data) {
      let max =
        this.state.data["opensearch:totalResults"] > 1000
          ? 1000
          : this.state.data["opensearch:totalResults"];
      console.log(max);
      if (parseInt(max) > this.limit && this.state.value !== "") {
        el = (
          <div className="d-grid gap-2">
            <Button
              onClick={this.incLimit}
              variant="secondary"
              size="lg"
              style={{ marginTop: "20px" }}
            >
              Show More
            </Button>
          </div>
        );
      }
    }
    return el;
  }

  render() {
    return (
      <div>
        <Container fluid>
          {/* Stack the columns on mobile by making one full-width and the other half-width */}
          <Row>
            <Col md={10}>
              <div class="searchBar">
                <input
                  value={this.state.value}
                  onChange={(e) => this.onChangeHandler(e)}
                  id="searchQueryInput"
                  type="text"
                  placeholder="Search"
                />
              </div>
            </Col>
            <Col md={2} className="filter">
              <Form.Select
                value={this.state.filter}
                onChange={(e) => this.handleChange(e)}
                className="selFil"
              >
                <option value="track">Track</option>
                <option value="artist">Artist</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
        {this.renderData}
        {this.renderMore}
      </div>
    );
  }
}

export default SearchFilter;
