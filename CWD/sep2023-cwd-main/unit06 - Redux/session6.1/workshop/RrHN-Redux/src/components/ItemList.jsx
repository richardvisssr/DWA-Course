import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux"; // Importeer useDispatch en useSelector
import { fetchList } from "../reducers/itemlist.reducers";

export default function ItemList(props) {
  const [statuses, setStatuses] = useState({});
  const dispatch = useDispatch(); // Haal dispatch uit de Redux store

  useEffect(() => {
    // Dispatch de fetchList actie wanneer de component mount
    dispatch(fetchList());
  }, [dispatch]);

  // Haal de gegevens op uit de Redux store met useSelector
  // const items = useSelector((state) => state.itemlist.list);

  const changeStatus = (id, status) =>
    setStatuses({ ...statuses, [id]: status });

    return props.items.map((item) => {
      const idString = item.id ? item.id.toString() : ""; // Controleer of item.id gedefinieerd is
      return (
        <ListItem
          key={item.id}
          newsItem={item}
          changeStatus={changeStatus}
          status={statuses[idString]} // Gebruik idString in plaats van item.id.toString()
          selectNewsItem={props.selectItem}
        />
      );
    });    
}
