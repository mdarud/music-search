import React from "react";
import Card from "react-bootstrap/Card";
import "./searchResults.css";

// Show search results in list of cards
const SearchResults = ({ results }) => {
  const cardsArray = results.map((result, idx) => (
    <a target="_blank" rel="noopener noreferrer" href={result.url}>
      <Card className="flex-row flex-wrap" style={{ marginTop: "10px" }}>
        <Card.Header>{idx + 1}</Card.Header>
        <Card.Body>
          <Card.Title>{result.name}</Card.Title>
          {result.artist ? (
            <Card.Subtitle className="mb-2 text-muted">
              {result.artist}
            </Card.Subtitle>
          ) : (
            <div></div>
          )}
          <Card.Text>Listeners: {result.listeners}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  ));

  return <div>{cardsArray}</div>;
};

export default SearchResults;
