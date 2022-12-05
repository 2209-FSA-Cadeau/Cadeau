"use client"
import React from "react"

const ProductCards = props => {
    let productList = ""
    if(props.searchResults){
        productList = props.searchResults
    } else {
        productList = props.categories
    }

    return (
        <div className="flex flex-col justify-evenly w-full h-100% p-7">
          <div className="grid grid-cols-3 gap-[3rem] ">
            { // if search value appears, take precedence, otherwise, render normally
            productList.length === 0 ?
                    "Loading Products...":
                productList.slice(props.offset, props.offset + props.limit).map((product, index) => (
                  <div key={index} className="border-2 border-black rounded-md w-40% h-40%"> 
                    <picture className="w-auto h-40%">
                      <img src={product.image} alt="" />
                    </picture>
                    <div>
                      Title: {product.title}
                      Link: {product.link}
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
      )
}

export default ProductCards

