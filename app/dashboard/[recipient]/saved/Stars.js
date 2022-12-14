import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push("fill");
    } else if (i - 0.5 === rating) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return (
    <div className="flex items-center">
      {stars.map((star) => {
        return star === "fill" ? (
          <BsStarFill />
        ) : star === "half" ? (
          <BsStarHalf />
        ) : star === "empty" ? (
          <BsStar />
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default Stars;
