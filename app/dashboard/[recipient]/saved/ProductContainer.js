import React from "react";
import ProductCard from "./ProductCard";

export default function ProductContainer(props) {
  const { display, gifted, saved } = props;
  if (display === "gifted") {
    return (
      <div>
        <h1>Gifted</h1>
        <div>
          {gifted.map((item) => {
            return <ProductCard item={item} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Saved</h1>
        <div>
          {saved.map((item) => {
            return <ProductCard item={item} />;
          })}
        </div>
      </div>
    );
  }
}
