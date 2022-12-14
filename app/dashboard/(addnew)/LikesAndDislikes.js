import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categories } from "../[recipient]/preferences/picklistChoices";

export default function LikesAndDislikes(props) {
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

  const dislikesChangeHandler = (selectedOption) => {
    setNewRecipient({
      ...newRecipient,
      dislikes: selectedOption,
    });
  };

  const styles = {
    container: (baseStyles, state) => ({
      ...baseStyles,
      height: "100%",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "cblue-300" : "gray-300",
      height: "100%",
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      height: "100%",
      display: "flex",
      alignItems: "flex-start",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      height: "100%",
      borderColor: "transparent",
      placeItems: "start",
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: "cblue-700",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      color: "cblue-700",
      zIndex: "50",
    }),
  };

  return (
    <div className="flex flex-col justify-start h-full pb-4">
      <div className="border-b border-cblue-700">
        <h1>Likes and Dislikes</h1>
        <h2 className="my-3">
          Add some preferences to help us make recommendations
        </h2>
      </div>
      <div className="grow flex flex-col justify-start w-full h-full gap-[2%] pt-4">
        <div className="basis-[30%] flex flex-col">
          <label className="block mb-2 text-lg font-bold">
            <h2>What do they like?</h2>
          </label>
          <Select
            value={newRecipient.likes.map((like) => like)}
            components={makeAnimated()}
            options={options}
            onChange={likesChangeHandler}
            isMulti
            instanceId={"likes"}
            styles={styles}
            className="p-1 text-lg text-cblue-700 overflow-visible"
          />
        </div>
        <div className="basis-[30%] flex flex-col">
          <label className="block mb-2 text-lg font-bold">
            <h2>What do they dislike?</h2>
          </label>
          <Select
            value={newRecipient.dislikes.map((dislike) => dislike)}
            components={makeAnimated()}
            options={options}
            onChange={dislikesChangeHandler}
            isMulti
            instanceId={"dislikes"}
            styles={styles}
            className="p-1 text-lg text-cblue-700 overflow-visible"
          />
        </div>
      </div>
    </div>
  );
}
