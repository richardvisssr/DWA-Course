/* eslint-disable react/prop-types */
export default function ListItem(props) {
  // const { newsItem } = props; 
  return (
    <div className="Item">
      <div className="mainInfo">
        <div>
        <a className="itemTitle" href={props.newsItem.ulr}>
            {props.newsItem.title}
          </a>
          <span className="domain">(github.com)</span>
        </div>
        <div className="info">
        {props.newsItem.scrore}
          <span className="divider">|</span>
          by {props.newsItem.bt}
          <span className="divider">|</span>
          {props.newsItem.time}
          <span className="divider">|</span>
          <a
            className="comments"
            href="https://news.ycombinator.com/item?id={props.newsItem.time}}"
          >
            <strong>665</strong> comments
          </a>
        </div>
      </div>
    </div>
  );
}



