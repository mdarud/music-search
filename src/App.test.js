import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Search from "./pages/search";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

test("renders chart page", () => {
  render(<App />);
  const linkElement = screen.getByText("Search");
  expect(linkElement).toBeInTheDocument();
});

test("renders search page", () => {
  render(<Search />);
  const linkElement = screen.getByText("No search result :(");
  expect(linkElement).toBeInTheDocument();
});

test("show more button search", async () => {
  const utils = render(<Search />);
  const input = utils.getByPlaceholderText("Search");
  fireEvent.change(input, { target: { value: "Dom" } });
  await waitFor(() => screen.getByRole("button"));
  const linkElement = screen.getByRole("button");
  expect(linkElement).toBeInTheDocument();
});

test("search result matches", async () => {
  const utils = render(<Search />);
  const input = utils.getByPlaceholderText("Search");
  fireEvent.change(input, { target: { value: "love" } });
  await waitFor(() => screen.getAllByText("love", { exact: false }));
  const linkElement = screen.getAllByText("love", { exact: false });
  expect(linkElement.length != 0);
});

test("search filter match result", async () => {
  const utils = render(<Search />);
  const sel = utils.getByDisplayValue("Track");
  const input = utils.getByPlaceholderText("Search");
  fireEvent.change(sel, { target: { value: "artist" } });
  fireEvent.change(input, { target: { value: "Dom" } });
  await waitFor(() => screen.getByRole("button"));
  const linkElement = screen.getByText("Artist");
  expect(linkElement).toBeInTheDocument();
});
