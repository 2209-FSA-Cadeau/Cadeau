import React from "react";

function PageLayout(props) {
  
  return (
    <div className="flex flex-col justify-start">
      <div className="flex justify-between mb-2">
        <h1 className="uppercase tracking-wider">
          {props.params.category === "topRecs"
            ? "Top Choices"
            : props.params.category}
        </h1>
      </div>
      {props.children}
    </div>
  );
}

export default PageLayout;
