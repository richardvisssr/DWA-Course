/* eslint-disable react/prop-types */
function ListItem(props) {
  // console.log(props);
  return (
    <div className="Item" onClick={props.onClick}>
      <div className="mainInfo">
        <div>
          <a
            className="itemTitle"
            href={props.item.url}
          >
            {props.item.title}
          </a>
          <span className="domain">(github.com)</span>
        </div>
        <div className="info">
          {props.item.score}
          <span className="divider">|</span>
          by {props.item.by}
          <span className="divider">|</span>
          by {props.item.time}
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
  );
}

export default ListItem;
