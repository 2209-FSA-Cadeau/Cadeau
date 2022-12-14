import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import PreferenceCard from "./PreferenceCard";
import { categories } from "./picklistChoices";
import {
  addDislike,
  addLike,
  deleteLike,
  deleteDislike,
  fetchPreferences,
  fetchHolidays,
  fetchNote,
} from "../../../../store/recipientSlice";

const PreferenceContainer = () => {
  const { singleRecipient } = useSelector((store) => store.recipients);
  const { userId } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  useEffect(() => {
    //Logic for displaying likes and dislikes

    const newLikes = [];
    const newDislikes = [];

    if (!singleRecipient.preferences) {
      dispatch(fetchPreferences(singleRecipient.id));
    } else if (singleRecipient.preferences) {
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

    if (!singleRecipient.holidays) {
      dispatch(fetchHolidays(singleRecipient.id));
    }
    if (!singleRecipient.note) {
      fetchNote({ userId, recipientId: singleRecipient.id });
    }
    const requiredIds = {
      userId,
      recipientId: singleRecipient.id,
    };
  }, [singleRecipient.preferences]);

  useEffect(() => {
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
  const likesChangeHandler = async (selectedOption) => {
    if (
      selectedOption.length + dislikes.length >
      singleRecipient.preferences.length
    ) {
      const selectedLike = selectedOption[selectedOption.length - 1].label;
      dispatch(
        addLike({ like: selectedLike, recipientId: singleRecipient.id })
      );
    } else if (
      selectedOption.length + dislikes.length <
      singleRecipient.preferences.length
    ) {
      await dispatch(deleteLike(singleRecipient.id));
      selectedOption.forEach(async (like) => {
        await dispatch(
          addLike({ like: like.label, recipientId: singleRecipient.id })
        );
        dispatch(fetchPreferences(singleRecipient.id));
      });
    }

    const options = selectedOption.map((option) => {
      return option.label;
    });
    setLikes(options);
  };

  // Handle changes to the dislikes array
  const dislikesChangeHandler = async (selectedOption) => {
    if (
      selectedOption.length + likes.length >
      singleRecipient.preferences.length
    ) {
      const selectedDislike = selectedOption[selectedOption.length - 1].label;
      dispatch(
        addDislike({
          dislike: selectedDislike,
          recipientId: singleRecipient.id,
        })
      );
    } else if (
      selectedOption.length + likes.length <
      singleRecipient.preferences.length
    ) {
      await dispatch(deleteDislike(singleRecipient.id));
      selectedOption.forEach(async (dislike) => {
        await dispatch(
          addDislike({
            dislike: dislike.label,
            recipientId: singleRecipient.id,
          })
        );
        dispatch(fetchPreferences(singleRecipient.id));
      });
    }

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

  // Render
  return (
    <div className="grow flex flex-col justify-start w-full h-full gap-[2%]">
      <div className="basis-[20%] flex flex-col justify-start">
        
          <h2>Things {singleRecipient.name} Likes</h2>
          <Select
            value={likes.map((like) => {
              return { value: like.toLowerCase(), label: like };
            })}
            components={makeAnimated()}
            options={options}
            onChange={likesChangeHandler}
            isMulti
            instanceId={"likes"}
            styles={styles}
            className="p-1 text-lg text-cblue-700 overflow-visible mt-1"
          />
        </div>
        <div className="basis-[20%] flex flex-col justify-start">
          <h2>Things {singleRecipient.name} Hates</h2>
          <Select
            value={dislikes.map((dislike) => {
              return { value: dislike.toLowerCase(), label: dislike };
            })}
            components={makeAnimated()}
            options={options}
            onChange={dislikesChangeHandler}
            isMulti
            instanceId={"dislikes"}
            styles={styles}
            className="p-1 text-lg text-cblue-700 overflow-visible mt-1"
          />
        </div>
      </div>

  );
};

export default PreferenceContainer;
