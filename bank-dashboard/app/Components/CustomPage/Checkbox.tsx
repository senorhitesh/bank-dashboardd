import React from "react";

const Checkbox = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      className="checkbox-wrapper-16"
    >
      <label className="checkbox-wrapper">
        <input type="checkbox" className="checkbox-input" />
        <span
          style={{
            overflow: "hidden",
          }}
          className="checkbox-tile"
        >
          <span
            style={{
              fontSize: "12px",
            }}
            className="checkbox-label "
          >
            {title}
          </span>
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
