/* eslint-disable */
import React, { useState } from "react";

function PreferencesDialog(props) {
  const [value, setValue] = useState(props.listSize);
  const [color, setColor] = useState(props.color); // Voeg een nieuwe state voor kleur toe
  const [styles, setStyles] = useState({
    border: '1px solid black'
  });

  const handleChange = (event) => {
    let newValue = Number(event.target.value);
    const minValue = Number(event.target.min);
    const maxValue = Number(event.target.max);

    if (newValue === minValue) {
      setStyles({ border: '10px solid red' });
      newValue = minValue;
    } else if (newValue === maxValue) {
      setStyles({ border: '10px solid red' });
      newValue = maxValue;
    }

    // props.setListSize(newValue);
    setValue(newValue);
  };

  const handlePreferencesChange = () => {
    props.applyPreferences(color, value);
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor); // Bijwerken van de kleurstate
    // props.setColor(newColor);
  };

  return (
    <div id="react-root">
      <div data-reactroot="" className="App orange">
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
                value={value}
              />{" "}
              items in the list.
            </label>
            <label htmlFor="colorField">
              color:
              <select id="colorField" onChange={handleColorChange} value={color}>
                <option value="orange">orange</option>
                <option value="green">green</option>
                <option value="brown">brown</option>
              </select>
            </label>
            <div className="dialogButtons">
              <button onClick={handlePreferencesChange}>OK</button>
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <script src="bundle.js"></script>
    </div>
  );
}

export default PreferencesDialog;
