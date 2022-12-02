import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categories } from "../[recipient]/preferences/picklistChoices";

export default function Likes(props) {
  const { newRecipient, setNewRecipient } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let newOptions = [];
    if (newRecipient.likes.length > 0 || newRecipient.dislikes.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        if (
          newRecipient.likes.indexOf(categories[i]) === -1 &&
          newRecipient.dislikes.indexOf(categories[i]) === -1
        ) {
          newOptions.push(categories[i]);
        }
      }
      setOptions(newOptions);
    } else {
      setOptions(categories);
    }
  }, [newRecipient.likes, newRecipient.dislikes]);

  const likesChangeHandler = (selectedOption) => {
    setNewRecipient({
      ...newRecipient,
      likes: selectedOption,
    });
  };

  return (
    <div>
      <h2>What does this person like?</h2>
      <Select
        value={newRecipient.likes.map((like) => like)}
        components={makeAnimated()}
        options={options}
        onChange={likesChangeHandler}
        isMulti
        instanceId={"likes"}
      />
    </div>
  );
}
