/* eslint-disable */
import ListItem from "./ListItem"; // Assuming ListItem is in the same directory

function ItemList(props) {
  return (
    <div>
      {props.items.slice(0,props.listSize).map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onClick={() => {
            props.onSelectedItem(item.url);
          }}
        />
      ))}
    </div>
  );
}

export default ItemList;
