/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";

import frontPageItems from "../frontpageData";

import ItemList from "./ItemList";

export default function App() {
  const [items] = useState(frontPageItems);

  return (
    <div className="App">
      <ListPanel items={items} />
      <ItemPanel/>
    </div>
  );
}

function ListPanel(props) {
  console.log(props);
  return (
    <div id="ListPanel">
      <div className="ItemList">
        <div className="Logo">
          <div className="colored">RRHN</div>

          <div className="title">Hacker News</div>
        </div>

        <div id="ListMainContent">
          <ItemList newsItem={props} />
        </div>
        <div id="ListFooter">
          visual design based on
          <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">
            this redesign by unknown author
          </a>
          .
        </div>
      </div>
    </div>
  );
}

function ItemPanel() {
  return (
    <div id="ItemPanel">
      <h2>No item selected yet.</h2>

      <p>Select an item in the colum on the left.</p>
    </div>
  );
}
