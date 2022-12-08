import React from "react";

export default function SavedFilter(props) {
  const { setFilter, type } = props;
  return (
    <div>
      <button onClick={() => setFilter(type)}>
        <b>{type}</b>
      </button>
    </div>
  );
}
