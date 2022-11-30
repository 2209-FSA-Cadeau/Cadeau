import React from "react";
import PreferenceCard from "./PreferenceCard";

const PreferenceContainer = (props) => {
  const { choices } = props;

  return (
    <div>
      {choices.map((choice, index) => {
        return <PreferenceCard choice={choice} key={index} />;
      })}
    </div>
  );
};

export default PreferenceContainer;
