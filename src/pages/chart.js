import React, { Component } from "react";
import ChartTrack from "../components/chartTrack/chartTrack";
import ChartArtist from "../components/chartArtist/chartArtist";
import "./chart.css";

class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "tracks",
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.title = "Chart | MusicBase";
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <h1 style={{ fontFamily: "monospace" }}>
          Top 100 &ensp;
          <select
            className="filterSel"
            value={this.state.value}
            onChange={this.onChange}
          >
            <option value="tracks">Tracks</option>
            <option value="artists">Artists</option>
          </select>
        </h1>
        {this.state.value === "tracks" ? <ChartTrack /> : <ChartArtist />}
      </div>
    );
  }
}

const Chart = () => {
  return <ChartView />;
};
export default Chart;
