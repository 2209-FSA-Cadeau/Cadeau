import React from "react";

export default function Demographics(props) {
  const { newRecipient, setNewRecipient } = props;

  return (
    <div>
      <label>Birthday</label>
      <input
        type="text"
        name="brithday"
        value={newRecipient.birthday}
        onChange={(e) => {
          setNewRecipient({
            ...newRecipient,
            birthday: e.target.value,
          });
        }}
        placeholder="MM/DD"
      />
      <label>Occupation</label>
      <input
        name="occupation"
        value={newRecipient.occupation}
        onChange={(e) => {
          setNewRecipient({
            ...newRecipient,
            occupation: e.target.value,
          });
        }}
      />
    </div>
  );
}
