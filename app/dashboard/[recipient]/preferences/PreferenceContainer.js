import React from "react";
import PreferenceCard from "./PreferenceCard";
import { useDispatch, useSelector } from "react-redux";

const PreferenceContainer = (props) => {
  const { choices, type } = props;
  const { singleRecipient } = useSelector((store) => store.recipients);

    if (singleRecipient.preferences) {
      return (
        <div>
          {singleRecipient.preferences.map((preference, index) => {
            if (preference.preference === "like" && type === "like") {
              return <PreferenceCard choice={preference.category} key={index} />;
            } else if (
              preference.preference === "dislike" &&
              type === "dislike"
            ) {
              return <PreferenceCard choice={preference.category} key={index} />;
            }
          })}
        </div>
      );
    } else {
      return (
        <div>
          {choices.map((choice, index) => {
            return <PreferenceCard choice={choice} key={index} />;
          })}
        </div>
      );
    }
  };



export default PreferenceContainer;
