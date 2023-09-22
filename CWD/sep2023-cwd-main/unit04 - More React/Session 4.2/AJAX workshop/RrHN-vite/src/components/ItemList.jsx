/* eslint-disable */
import ListItem from "./ListItem";
import React, { useEffect } from "react";

function ItemList(props) {

  useEffect(() => {
    const url = "http://localhost:3000/itemStatuses";

    async function fetchItemStatuses() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `HTTP GET request went wrong: got "${response.statusText}" for "${url}"`
          );
        }

        const json = await response.json();
        props.setItemStatuses(json);
      } catch (error) {
        console.error(error);
      }
    }

    fetchItemStatuses();
  }, []);

  async function storeItemStatus(itemId, newStatus) {
    const url = "http://localhost:3000/itemStatuses/" + itemId;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'text/plain' // Use text/plain as the content type
        },
        body: newStatus,
      });

      if (!response.ok) {
        throw new Error(`HTTP PUT request went wrong: got "${response.statusText}" for "${url}"`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {props.items.slice(0, props.listSize).map((item) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            itemStatus={props.itemStatuses[item.id]}
            onClick={() => {
              props.onSelectedItem(item.url);
              props.setItemStatuses({
                ...props.itemStatuses,
                [item.id]: "read",
              });
              storeItemStatus(item.id, "read"	 );
            }}
          />
        );
      })}
    </div>
  );
}

export default ItemList;
