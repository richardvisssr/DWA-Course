"use client";
import NewsBlog from "@/components/NewsBlog";
import "./globals.css";
import React, { useState, createContext } from "react";

export const PreferencesContext = createContext({
  color: "jemoer",
  listSize: 32,
}); 

export default function RootLayout({ children }) {
  const [preferences, setPreferences] = useState({
    color: "orange",
    listSize: 10,
  });

  return (
    <html lang="en">
      <body>
        <PreferencesContext.Provider value={{ preferences, setPreferences }}>
          <NewsBlog children={children} />
        </PreferencesContext.Provider>
      </body>
    </html>
  );
}
