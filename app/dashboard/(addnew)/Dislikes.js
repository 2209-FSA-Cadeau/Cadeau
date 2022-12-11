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

  const dislikesChangeHandler = (selectedOption) => {
    setNewRecipient({
      ...newRecipient,
      dislikes: selectedOption,
    });
  };

  return (
    <div>
      <h2>What does this person dislike?</h2>
      <Select
        value={newRecipient.dislikes.map((dislike) => dislike)}
        components={makeAnimated()}
        options={options}
        onChange={dislikesChangeHandler}
        isMulti
        instanceId={"dislikes"}
      />
    </div>
  );
}
