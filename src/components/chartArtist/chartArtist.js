import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./chartArtist.css";

const ChartArtistView = ({ results }) => {
  const cardsArray = results.map((result, idx) => (
    <a target="_blank" rel="noopener noreferrer" href={result.url}>
      <Card className="flex-row flex-wrap" style={{ marginTop: "10px" }}>
        <Card.Header>{idx + 1}</Card.Header>
        <Card.Body>
          <Card.Title>{result.name}</Card.Title>
          <Card.Text>
            Listeners: {result.listeners} - Play Count: {result.playcount}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  ));

  return <div>{cardsArray}</div>;
};

class ChartArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=100&api_key=841704413b89e721e85e0cdb2d86b997&format=json`
      )
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      });
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          <ChartArtistView results={this.state.data.artists.artist} />
        ) : null}
      </div>
    );
  }
}

export default ChartArtist;
