/* eslint-disable */
import { useState } from "react";
import ItemList from "./ItemList";
import frontPageItems from "../frontpageData";
import IFrameArea from "./IFrameArea";
import PreferencesDialog from "./PreferencesDialog"; // <-- Add this line

function NewsBlog(props) {
  const [items] = useState(frontPageItems);
  const [color, setColor] = useState("orange");
  const [listSize, setListSize] = useState(2);

  const handleSelectedItem = (items) => {
    setIframeUrl(items);
  };

  const handlePreferencesShown = () => {
    props.setVisibility(!props.visibility);
  };

  function applyPreferences(color, listSize){
    setColor(color);
    console.log(color);
    setListSize(listSize);
    handlePreferencesShown();
  }

  const [iframeUrl, setIframeUrl] = useState(
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.schoolplaten.com%2Fafbeelding-konijn-i10201.html&psig=AOvVaw1wY0wsO8Ti4bE4OZc_-wdP&ust=1694769447290000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLio8qniqYEDFQAAAAAdAAAAABAI"
  );

  return (
    <div id="react-root">
      <div data-reactroot="" className={`App ${color}`}>
        <div id="ListPanel">
          <div className="ItemList">
            <header id="ListHeader" className="panelHeader">
              <div className="Logo">
                <div className="colored">RrHN</div>
                <div className="title">React-redux Hacker News</div>
              </div>
              <span className="settingsIcon" onClick={handlePreferencesShown}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0-24.5 8.5t-11.5-21.5l-28-184q-49-16-90-37l142-107q9-9 24-9-13 0-25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z" />
                </svg>
              </span>
            </header>
            <div id="ListMainContent">
              <ItemList
                items={items}
                onSelectedItem={handleSelectedItem}
                listSize={listSize}
              />
            </div>
            <button id="markAsSeen">Mark all items as &quot;seen&quot;</button>
            <footer id="ListFooter">
              visual design based on{" "}
              <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">
                this redesign by unknown author
              </a>
              .
            </footer>
          </div>
        </div>
        <div id="ListMainContent">
          {props.visibility ? (
            <PreferencesDialog
              color={color}
              setColor={setColor}
              listSize={listSize}
              setListSize={setListSize}
              applyPreferences={applyPreferences}
            />
          ) : (
            <IFrameArea iframeUrl={iframeUrl} />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsBlog;
