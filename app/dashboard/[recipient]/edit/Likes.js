import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categories } from "../preferences/picklistChoices";

export default function Likes(props) {
  const { updateRecipient, setUpdateRecipient } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let newOptions = [];
    if (
      updateRecipient.likes.length > 0 ||
      updateRecipient.dislikes.length > 0
    ) {
      for (let i = 0; i < categories.length; i++) {
        if (
          updateRecipient.likes.indexOf(categories[i]) === -1 &&
          updateRecipient.dislikes.indexOf(categories[i]) === -1
        ) {
          newOptions.push(categories[i]);
        }
      }
      setOptions(newOptions);
    } else {
      setOptions(categories);
    }
  }, [updateRecipient.likes, updateRecipient.dislikes]);

  const likesChangeHandler = (selectedOption) => {
    setUpdateRecipient({
      ...updateRecipient,
      likes: selectedOption,
    });
  };

  return (
    <div>
      <h2>What does this person like?</h2>
      <Select
        value={
          !updateRecipient.likes
            ? null
            : updateRecipient.likes.map((like) => like)
        }
        components={makeAnimated()}
        options={options}
        onChange={likesChangeHandler}
        isMulti
        instanceId={"likes"}
      />
    </div>
  );
}
