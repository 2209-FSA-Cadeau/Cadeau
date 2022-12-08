"use client"
import React from "react"
import { useSelector } from "react-redux"
import Cards from "./Cards"

const ProductCards = props => {
    const {checklist} = useSelector(state => state.shop)
    let productList = []
    
    if(props.filterView){
      productList = props.filterView
    } else if(props.category === "search") {
      productList = props.searchResults
    } else {
      productList = props.categories
    }

    if(checklist.prices || checklist.ratings || checklist.reviews){
      return(
        <div>
          { productList.length === 0 ?
             "No Products Found. Try Another Search!":
             <Cards productList={productList} offset={props.offset} limit={props.limit}/>
          }
      </div>
      )
    } else {
      return(
        <div>
          { productList.length === 0 ?
              "Loading Products...":
            <Cards productList={productList} offset={props.offset} limit={props.limit}/>
          }
        </div>
      )
      
    }
}

export default ProductCards

