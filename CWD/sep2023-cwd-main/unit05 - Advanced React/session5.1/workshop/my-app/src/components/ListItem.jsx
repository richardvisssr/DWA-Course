/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import  Link  from "next/link";

function ListItem(props) {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (props.itemStatus === "seen") {
      setStyles({ ...styles, color: "red" });
    } else if (props.itemStatus === "new") {
      setStyles({ ...styles, color: "purple" });
    } else if (props.itemStatus === "read") {
      setStyles({ ...styles, color: "green" });
    }
  }, [props.itemStatus]);

  return (
    <Link href={`/item/${props.item.id}`}>
      <div style={styles} className="Item" onClick={props.onClick}>
        <div className="mainInfo">
          <div>
            <a className="itemTitle" href={props.item.url}>
              {props.item.title}
            </a>
            <span className="domain">(github.com)</span>
          </div>
          <div className="info">
            {props.item.score}
            <span className="divider">|</span>
            by {props.item.by}
            <span className="divider">|</span>
            {props.item.time}
            <span className="divider">|</span>
            <a
              className="comments"
              href="https://news.ycombinator.com/item?id=12115187"
            >
              <strong>665</strong> comments
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ListItem;

