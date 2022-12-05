"use client";
import React from "react";

export default function Name(props) {
  const { updateRecipient, setUpdateRecipient } = props;

  return (
    <div>
      <label>Name</label>
      <input
        value={updateRecipient.name}
        onChange={(e) => {
          setUpdateRecipient({
            ...updateRecipient,
            name: e.target.value,
          });
        }}
        required
      />
      <label>Email</label>
      <input
        value={updateRecipient.email}
        onChange={(e) => {
          setUpdateRecipient({
            ...updateRecipient,
            email: e.target.value,
          });
        }}
        required
      />
    </div>
  );
}
