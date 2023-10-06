import React, { useEffect } from "react";
import { useState } from "react";

import ItemList from "./ItemList";
import Preferences from "./Preferences";
import { useDispatch, useSelector } from "react-redux";
import { switchPanelView } from "../reducers/preferences.reducer";
import { fetchList } from "../reducers/listpanel.reducers";

export default function App() {
  const listSize = useSelector((state) => state.preferences.listSize);
  const color = useSelector((state) => state.preferences.color);
  const items = useSelector((state) => state.listpanel.item);
  const activeItem = useSelector((state) => state.listpanel.activeItem);
  const activeItemId = useSelector((state) => state.listpanel.activeItemId);
  const [preferences, setPreferences] = useState({
    color: color,
    listSize: listSize,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch de fetchList actie wanneer de component mount
    dispatch(fetchList());
  }, [dispatch]);

  const savePrefs = (toBeSavedPreferences) =>
    setPreferences({ ...toBeSavedPreferences, active: false });

  return (
    <div className={`App ${preferences.color}`}>
      <ListPanel
        preferences={preferences}
        items={items.slice(0, preferences.listSize)}
        // selectItem={(id) => setActiveItemId(id)}
      />
      <ContentPanel
        // activeItem={activeItem}
        preferences={preferences}
        setPreferences={savePrefs}
      />
    </div>
  );
}

function ContentPanel(props) {
  const activePrefsPanel = useSelector((state) => state.preferences.viewPanel);

  let currentPanel = <EmptyPanel />;

  if (activePrefsPanel) {
    return (
      <Preferences
        preferences={props.preferences}
        setPreferences={props.setPreferences}
      />
    );
  } else if (!activePrefsPanel) {
    return <ItemPanel />;
  }
  return currentPanel;
}

function ListHeader() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.preferences.color);

  return (
    <header id="ListHeader" className="panelHeader">
      <div className="Logo">
        <div className={`colored ${color}`}>RRHN</div>

        <div className="title">Hacker News</div>
      </div>
      <span
        className="settingsIcon"
        onClick={() => dispatch(switchPanelView())}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"></path>
        </svg>
      </span>
    </header>
  );
}

function ListPanel(props) {
  return (
    <div id="ListPanel">
      <div className="ItemList">
        <ListHeader />
        <ListFooter />
        <div id="ListMainContent">
          <ItemList items={props.items} />
        </div>
      </div>
    </div>
  );
}

function EmptyPanel() {
  return (
    <div id="ItemPanel">
      <h2>No item selected yet.</h2>

      <p>Select an item in the colum on the left.</p>
    </div>
  );
}

function ItemPanel() {
  const activeItem = useSelector((state) => state.listpanel.activeItem);
  return (
    <div id="ItemPanel">
      <iframe className="IFrameView" src={activeItem.url} frameBorder={0} />
    </div>
  );
}

function ListFooter() {
  return (
    <div id="ListFooter">
      visual design based on
      <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">
        this redesign by unknown author
      </a>
      .
    </div>
  );
}
