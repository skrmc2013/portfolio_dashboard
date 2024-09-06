import React, { useState } from "react";

const MultiSelect = ({ label, options, selectedValues, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleRemove = (value) => {
    onChange(selectedValues.filter((item) => item !== value));
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    if (value && !selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
      setInputValue("");
    }
  };

  return (
    <div className="multi-select-container">
      <label className="text-sm font-medium leading-none">{label}</label>
      <div className="basic-multi-select css-b62m3t-container">
        <div className="select__control css-13cymwt-control">
          <div className="select__value-container select__value-container--is-multi select__value-container--has-value css-1dyz3mf">
            {selectedValues.map((item) => (
              <div key={item} className="select__multi-value css-1p3m7a8-multiValue">
                <div className="select__multi-value__label css-9jq23d">{item}</div>
                <div
                  role="button"
                  className="select__multi-value__remove css-v7duua"
                  aria-label={`Remove ${item}`}
                  onClick={() => handleRemove(item)}
                >
                  <svg
                    height="14"
                    width="14"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                    className="css-tj5bde-Svg"
                  >
                    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="select__input-container css-19bb58m">
            <input
              className="select__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(e)}
              list="multi-select-options"
              style={{ color: "inherit", background: "0px center", opacity: 1, width: "100%", font: "inherit", minWidth: "2px", border: "0px", margin: "0px", outline: "0px", padding: "0px" }}
            />
            <datalist id="multi-select-options">
              {options.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
