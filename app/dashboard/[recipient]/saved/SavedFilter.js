import React from "react";

export default function SavedFilter(props) {
  const { type } = props;
  return (
    <div>
      <button>
        <b>{type}</b>
      </button>
    </div>
  );
}
