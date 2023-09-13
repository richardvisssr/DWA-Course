/* eslint-disable react/prop-types */
import ListItem from "./ListItem";

export default function ItemList(props) {
  // console.log(props.newsItem.items);
  console.log(props);
  return (
    <div className="ItemList">
      {props.newsItem.items.map((item) => (
        <ListItem key={item.id} newsItem={item} />
      ))}
    </div>
  );
}
