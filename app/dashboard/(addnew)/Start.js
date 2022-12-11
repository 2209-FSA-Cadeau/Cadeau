import React from "react";

export default function Start({ firstTime }) {
  return (
    <div>
      {firstTime ? (
        <>
          <h1>First things first</h1>
          <h2>Let's add a recipient!</h2>
          <p>
            Here you can describe your recipient and select some likes/dislikes
          </p>
        </>
      ) : (
        <>
          <h1>Let's get started</h1>
          <h2>
            Here you can describe your recipient and select some likes/dislikes
          </h2>
        </>
      )}
    </div>
  );
}
