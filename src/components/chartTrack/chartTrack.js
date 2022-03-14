import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./chartTrack.css";

const ChartTrackView = ({ results }) => {
  const cardsArray = results.map((result, idx) => (
    <a target="_blank" rel="noopener noreferrer" href={result.url}>
      <Card className="flex-row flex-wrap" style={{ marginTop: "10px" }}>
        <Card.Header>{idx + 1}</Card.Header>
        <Card.Body>
          <Card.Title>{result.name}</Card.Title>
          <a target="_blank" rel="noopener noreferrer" href={result.artist.url}>
            <Card.Subtitle className="mb-2 text-muted">
              {result.artist.name}
            </Card.Subtitle>
          </a>
          <Card.Text>
            Listeners: {result.listeners} - Play Count: {result.playcount}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  ));

  return <div>{cardsArray}</div>;
};

class ChartTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=100&api_key=841704413b89e721e85e0cdb2d86b997&format=json`
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
          <ChartTrackView results={this.state.data.tracks.track} />
        ) : null}
      </div>
    );
  }
}

export default ChartTrack;
