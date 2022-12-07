import React from "react";

export default function PreferenceCard(props) {
  const { choice } = props;

  return (
    <span>
      <h4>
        {choice}
      </h4>
    </span>
  );
}
