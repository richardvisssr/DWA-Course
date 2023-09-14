import { useState } from "react";
import ItemList from "./ItemList";
import frontPageItems from "../frontpageData";
import IFrameArea from "./IFrameArea";

function NewsBlog() {
  const [items] = useState(frontPageItems);

  const handleSelectedItem = (items) => {
    console.log(items);
    setIframeUrl(items);
    console.log(setIframeUrl(items))
  };

  const [iframeUrl, setIframeUrl] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.schoolplaten.com%2Fafbeelding-konijn-i10201.html&psig=AOvVaw1wY0wsO8Ti4bE4OZc_-wdP&ust=1694769447290000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLio8qniqYEDFQAAAAAdAAAAABAI");

  return (
    <div className="App">
      <div id="ListPanel">
        <div className="ItemList">
          <div className="Logo">
            <div className="colored">RRHN</div>
            <div className="title">Hacker News</div>
          </div>
          <div id="ListMainContent">
            <ItemList items={items} onSelectedItem={handleSelectedItem} />
          </div>
          <div id="ListFooter">
            visual design based on
            <a  href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">
              this redesign by an unknown author
            </a>
            .
          </div>
        </div>
      </div>
      <IFrameArea iframeUrl={iframeUrl}/>
    </div>
    
  );
}

export default NewsBlog;
