import React from "react";

export default function Demographics(props) {
  const { updateRecipient, setUpdateRecipient } = props;

  return (
    <div>
      <label>Birthday</label>
      <input
        type="text"
        name="birthday"
        value={updateRecipient.birthday}
        onChange={(e) => {
          setUpdateRecipient({
            ...updateRecipient,
            birthday: e.target.value,
          });
        }}
        placeholder="MM/DD"
      />
      <label>Occupation</label>
      <input
        name="occupation"
        value={!updateRecipient.occupation ? "" : updateRecipient.occupation}
        onChange={(e) => {
          setUpdateRecipient({
            ...updateRecipient,
            occupation: e.target.value,
          });
        }}
      />
    </div>
  );
}
