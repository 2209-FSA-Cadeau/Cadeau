"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleCategory } from '../../../../store/shopSlice'
import ProductCards from "./ProductCards"
import { getSearchResults } from "../../../../store/shopSlice"

const CategoryPage = props => {
  const {categories, searchResults} = useSelector(state => state.shop)
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)

  useEffect(() => {
    if(Object.keys(props.searchParams).length === 0){
      if(categories[props.params.category].length === 0){
        if(props.params.category !== "Top%20Choices"){
          dispatch(getSingleCategory(props.params.category))
        } 
      }
    } else {
      dispatch(getSearchResults({category: props.searchParams.category, value: props.searchParams.value}))
    }
    setPage(1)
  }, [])

  //add use effect to dismount search value non-async -> need to add reducer to shopslice


  const clickHandler = (event) => {
    if(event.target.id === "back" && page > 1) {
      setPage((prePage) => prePage - 1)
    } else if (event.target.id === "forward"){
      setPage((prePage) => prePage + 1)
    }
  }

 const limit = 9
 const offset = (page - 1) * 9

if(Object.keys(props.searchParams).length > 0){
    return(
      <div>
        <ProductCards searchResults={searchResults} limit={limit} offset={offset}/>
        <div className="flex flex-row justify-center">
              <div id="back" className="mr-7 border-2 border-black rounded-md" onClick={clickHandler}>
                Previous Page
              </div>
              <div className="w-8 border-2 border-black rounded-md">
                {page}
              </div>
              <div id="forward" className="ml-7 border-2 border-black rounded-md" onClick={clickHandler}>
                Next Page
              </div>
        </div>
      </div> 
    )
} else {
  return(
    <div>
      <ProductCards categories={categories[props.params.category]} limit={limit} offset={offset}/>
      <div className="flex flex-row justify-center">
            <div id="back" className="mr-7 border-2 border-black rounded-md" onClick={clickHandler}>
              Previous Page
            </div>
            <div className="w-8 border-2 border-black rounded-md">
              {page}
            </div>
            <div id="forward" className="ml-7 border-2 border-black rounded-md" onClick={clickHandler}>
              Next Page
            </div>
      </div>
    </div>
  )
}
}

export default CategoryPage