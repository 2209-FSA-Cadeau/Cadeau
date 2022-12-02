"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PreferenceContainer from "./PreferenceContainer";
import { categories } from "./picklistChoices";
import { useSelector } from 'react-redux'

const Page = ({ params }) => {
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [options, setOptions] = useState([]);
  const { singleRecipient } = useSelector(store => store.recipients)

  useEffect(() => {
    let newOptions = [];
    if (likes.length > 0 || dislikes.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        if (
          likes.indexOf(categories[i].label) === -1 &&
          dislikes.indexOf(categories[i].label) === -1
        ) {
          newOptions.push(categories[i]);
        }
      }
      setOptions(newOptions);
    } else {
      setOptions(categories);
    }
  }, [likes, dislikes]);

  const likesChangeHandler = (selectedOption) => {
    const options = selectedOption.map((option) => {
      return option.label;
    });
    setLikes(options);
  };

  const dislikesChangeHandler = (selectedOption) => {
    const options = selectedOption.map((option) => {
      return option.label;
    });
    setDislikes(options);
  };

  return (
    <div>
      <br />
      <b>Recipient Preferences</b>
      <br />
      <span>
        <h3>Things {singleRecipient.name} Likes</h3>
        <PreferenceContainer choices={likes} />
        <br />
        <div>
          <h3>Likes</h3>
          <Select
            components={makeAnimated()}
            options={options}
            onChange={likesChangeHandler}
            isMulti
            instanceId={"likes"}
          />
        </div>
      </span>
      <br />
      <span>
        <h3>Things {singleRecipient.name} Hates</h3>
        <PreferenceContainer choices={dislikes} />
        <br />
        <div>
          <h3>Add Dislike</h3>
          <Select
            components={makeAnimated()}
            options={options}
            onChange={dislikesChangeHandler}
            isMulti
            instanceId={"dislikes"}
          />
        </div>
      </span>
      <br />
    </div>
  );
};

export default Page;
