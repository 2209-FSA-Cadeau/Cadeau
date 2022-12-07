import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import PreferenceCard from "./PreferenceCard";
import { categories } from "./picklistChoices";
import { addLikes } from "../../../../store/recipientSlice";

const PreferenceContainer = () => {
  const { singleRecipient } = useSelector((store) => store.recipients);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  useEffect(() => {
    const newLikes = [];
    const newDislikes = [];

    // Logic for conditional rendering of preferences from database
    if (!singleRecipient.preferences) {
      console.log("loading");
    } else if (likes.length === 0 && dislikes.length === 0) {
      singleRecipient.preferences.map((preference) => {
        if (preference.preference === "like") {
          newLikes.push(preference.category);
        } else {
          newDislikes.push(preference.category);
        }
      });
      setLikes(newLikes);
      setDislikes(newDislikes);
    }

    // Logic for populating only unselected options in the likes/dislikes picklists
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

  // Handle changes to the likes array
  const likesChangeHandler = (selectedOption) => {
    const selectedLike = selectedOption[selectedOption.length - 1].label;
    const options = selectedOption.map((option) => {
      return option.label;
    });
    setLikes(options);
    dispatch(addLikes({like: selectedLike, recipientId: singleRecipient.id}));
  };

  // Handle changes to the dislikes array
  const dislikesChangeHandler = (selectedOption) => {
    const options = selectedOption.map((option) => {
      return option.label;
    });
    setDislikes(options);
  };

  // Handle delete requests for both the likes and dislikes arrays
  const onDeleteHandler = (event) => {
    event.target.name === "like"
      ? setLikes(likes.filter((like) => like != event.target.value))
      : setDislikes(
          dislikes.filter((dislike) => dislike != event.target.value)
        );
  };

  // Render
  return (
    <div>
      <div>
        <h2>Things {singleRecipient.name} Likes</h2>
        {likes.map((like, index) => {
          return (
            <div>
              <PreferenceCard type={"like"} choice={like} key={index} />
              <button
                name="like"
                value={like}
                onClick={onDeleteHandler}
                key={`btn-${index}`}
              >
                X
              </button>
            </div>
          );
        })}
        <br />
        <Select
          value={likes.map((like) => {
            return { value: like.toLowerCase(), label: like };
          })}
          components={makeAnimated()}
          options={options}
          onChange={likesChangeHandler}
          isMulti
          instanceId={"likes"}
        />
      </div>
      <br />
      <div>
        <h2>Things {singleRecipient.name} Hates</h2>
        {dislikes.map((dislike, index) => {
          return (
            <div>
              <PreferenceCard type={"dislike"} choice={dislike} key={index} />
              <button
                name="dislike"
                value={dislike}
                onClick={onDeleteHandler}
                key={`btn-${index}`}
              >
                X
              </button>
            </div>
          );
        })}
        <br />
        <h3>Add Dislikes</h3>
        <Select
          value={dislikes.map((dislike) => {
            return { value: dislike.toLowerCase(), label: dislike };
          })}
          components={makeAnimated()}
          options={options}
          onChange={dislikesChangeHandler}
          isMulti
          instanceId={"dislikes"}
        />
      </div>
    </div>
  );
};

export default PreferenceContainer;
