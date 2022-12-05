import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function Holidays(props) {
  const { newRecipient, setNewRecipient } = props;
  const [occasion, setOccasion] = useState({
    name: "",
    date: "",
  });

  const holidays = [
    { value: "christmas", label: "Christmas" },
    { value: "memorialDay", label: "Memorial Day" },
    { value: "thanksgiving", label: "Thanksgiving" },
  ];

  const occasionNameHandler = (event) => {
    setOccasion({
      ...occasion,
      name: event.target.value,
    });
  };

  const occasionDateHandler = (event) => {
    setOccasion({
      ...occasion,
      date: event.target.value,
    });
  };

  const occasionDeleteHandler = (event) => {
    setNewRecipient({
      ...newRecipient,
      occasions: newRecipient.occasions.filter(
        (e) => e.name != event.target.value
      ),
    });
  };

  const occasionSubmitHandler = (event) => {
    event.preventDefault();
    setNewRecipient({
      ...newRecipient,
      occasions: [...newRecipient.occasions, occasion],
    });
    setOccasion({
      name: "",
      date: "",
    });
  };

  const holidayChangeHandler = (selectedOption) => {
    setNewRecipient({
      ...newRecipient,
      holidays: selectedOption,
    });
  };

  return (
    <div>
      <h2>Other Important Dates</h2>
      <br />
      <h2>Occassions to Remember</h2>
      <ul>
        {newRecipient.occasions.map((occasion, index) => {
          return (
            <li key={index}>
              <div>
                {occasion.name} - {occasion.date}
              </div>
              <button value={occasion.name} onClick={occasionDeleteHandler}>
                X
              </button>
            </li>
          );
        })}
      </ul>

      <form onSubmit={occasionSubmitHandler}>
        <label>Occasion Name</label>
        <input
          type="text"
          value={occasion.name}
          onChange={occasionNameHandler}
        />
        <label>Occasion Date</label>
        <input
          type="text"
          value={occasion.date}
          placeholder="MM/DD"
          onChange={occasionDateHandler}
        />
        <button type="submit">Add Occasion</button>
      </form>
      <br />
      <label>Holidays Celebrated</label>
      <Select
        value={newRecipient.holidays.map((holiday) => holiday)}
        components={makeAnimated()}
        options={holidays}
        onChange={holidayChangeHandler}
        isMulti
        instanceId={"holidays"}
      />
    </div>
  );
}
