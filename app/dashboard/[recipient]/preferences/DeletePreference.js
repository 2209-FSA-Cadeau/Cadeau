import React from "react";

export default function DeletePreference(props) {
  const { choice } = props;

  return <button value={choice}>X</button>;
}
