"use client";
import React, { useState, useContext } from "react";
import { PreferencesContext } from "@/app/layout";
import { useRouter } from 'next/navigation'

function PreferencesDialog(props) {
  const router = useRouter()
  const { preferences, setPreferences } = useContext(PreferencesContext);
  const [listSize, setListSize] = useState(preferences.listSize);
  const [color, setColor] = useState(preferences.color);

  const [styles, setStyles] = useState({
    border: "1px solid black",
  });

  const handleChange = (event) => {
    let newValue = Number(event.target.value);
    const minValue = Number(event.target.min);
    const maxValue = Number(event.target.max);

    if (newValue === minValue) {
      setStyles({ border: "10px solid red" });
      newValue = minValue;
    } else if (newValue === maxValue) {
      setStyles({ border: "10px solid red" });
      newValue = maxValue;
    }

    // Update preferences with a new object containing the updated listSize
    setListSize(newValue);
  };

  const applyPreferences = () => {
    setPreferences({
      ...preferences,
      listSize: listSize,
      color: color,
    });

  
    router.push('/');
  };
  return (
    <div id="react-root">
      <div data-reactroot="" className={`App ${preferences.color}`}>
        <div id="ContentPanel" className="preferences">
          <div className="PreferencesDialog">
            <header>
              <div className="Logo">
                <div className="colored">RrHN</div>
                <div className="title">Settings</div>
              </div>
            </header>
            <label htmlFor="listSizeField" style={styles}>
              Show{" "}
              <input
                onChange={handleChange}
                type="number"
                min="0"
                max="500"
                id="listSizeField"
                value={listSize}
              />{" "}
              items in the list.
            </label>
            <label htmlFor="colorField">
              color:
              <select
                id="colorField"
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="orange">orange</option>
                <option value="green">green</option>
                <option value="brown">brown</option>
              </select>
            </label>
            <div className="dialogButtons">
              <button onClick={applyPreferences}>OK</button>
              <button onClick={applyPreferences}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <script src="bundle.js"></script>
    </div>
  );
}

export default PreferencesDialog;
