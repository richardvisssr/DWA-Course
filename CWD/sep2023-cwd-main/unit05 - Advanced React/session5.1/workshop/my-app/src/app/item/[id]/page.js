"use client";

import IFrameArea from "@/components/IFrameArea";
import { useState, useEffect } from "react";

export default function ItemPage({ params }) {
  const [item, setItems] = useState([]);
  const id = params.id;
  console.log(id);

  useEffect(() => {
    async function frontPageItems() {
      const url = "http://localhost:3000/hn/topstories";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `HTTP GET request went wrong: got "${response.statusText}" for "${url}"`
          );
        }

        const json = await response.json();
        Object.values(json).forEach((item) => {
          if (item.id == id) {
            setItems(item);
          }
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    frontPageItems();
  }, []);

  return <IFrameArea iframeUrl={item.url} />;
}
