// ItemList.jsx
import ListItem from "./ListItem"; // Assuming ListItem is in the same directory

function ItemList(props) {
  return (
    <div>
      {props.items.map((item) => (
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
