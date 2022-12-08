import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categories } from "../preferences/picklistChoices";

export default function Likes(props) {
  const { updateRecipient, setUpdateRecipient } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let newOptions = [];
    if (updateRecipient.likes.length > 0 || updateRecipient.dislikes.length > 0) {
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

  const dislikesChangeHandler = (selectedOption) => {
    setUpdateRecipient({
      ...updateRecipient,
      dislikes: selectedOption,
    });
  };

  return (
    <div>
      <h2>What does this person dislike?</h2>
      <Select
        value={
          !updateRecipient.dislikes
            ? null
            : updateRecipient.dislikes.map((dislike) => dislike)
        }
        components={makeAnimated()}
        options={options}
        onChange={dislikesChangeHandler}
        isMulti
        instanceId={"dislikes"}
      />
    </div>
  );
}
