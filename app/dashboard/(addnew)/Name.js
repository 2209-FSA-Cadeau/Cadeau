"use client";
import React from "react";

export default function Name(props) {
  const { newRecipient, setNewRecipient } = props;

  return (
    <div>
      <label>Name</label>
      <input
        value={newRecipient.name}
        onChange={(e) => {
          setNewRecipient({
            ...newRecipient,
            name: e.target.value,
          });
        }}
        required
      />
      <label>Email</label>
      <input
        value={newRecipient.email}
        onChange={(e) => {
          setNewRecipient({
            ...newRecipient,
            email: e.target.value,
          });
        }}
        required
      />
    </div>
  );
}
