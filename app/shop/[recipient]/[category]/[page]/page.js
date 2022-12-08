"use client"
import React, { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import ProductCards from "./ProductCards"
import { getSingleCategory, getSearchResults} from "../../../../../store/shopSlice"

const PagePage = props => {
  const {categories, searchResults} = useSelector(state => state.shop)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if(props.params.category !== 'search'){
      if(categories[props.params.category].length === 0){
        if(props.params.category !== "Top%20Choices"){
          dispatch(getSingleCategory(props.params.category))
        } 
      }
    } else {
        if(searchResults.length === 0){
            dispatch(getSearchResults({category: props.searchParams.category, value: props.searchParams.value}))
        } 
    }
    
  }, [])


  const clickHandler = (event) => {
    if(event.target.id === "back" && Number(props.params.page) > 1) {
      if(props.searchParams.filter){
        if(props.params.category === "search"){
          router.push(`/shop/${props.params.recipient}/search/${Number(props.params.page) - 1}?category=${props.searchParams.category}&value=${props.searchParams.value}&filter=${props.searchParams.filter}`)
      } else {
          router.push(`/shop/${props.params.recipient}/${props.params.category}/${Number(props.params.page) - 1}?filter=${props.searchParams.filter}`)
      }
      } else {
        if(props.params.category === "search"){
          router.push(`/shop/${props.params.recipient}/search/${Number(props.params.page) - 1}?category=${props.searchParams.category}&value=${props.searchParams.value}`)
      } else {
          router.push(`/shop/${props.params.recipient}/${props.params.category}/${Number(props.params.page) - 1}`)
      }
      }
    } else if (event.target.id === "forward"){
        if(props.searchParams.filter){
          if(props.params.category === "search"){
            router.push(`/shop/${props.params.recipient}/search/${Number(props.params.page) + 1}?category=${props.searchParams.category}&value=${props.searchParams.value}&filter=${props.searchParams.filter}`)
          } else {
              router.push(`/shop/${props.params.recipient}/${props.params.category}/${Number(props.params.page) + 1}?filter=${props.searchParams.filter}`)
          }
        } else {
          if(props.params.category === "search"){
            router.push(`/shop/${props.params.recipient}/search/${Number(props.params.page) + 1}?category=${props.searchParams.category}&value=${props.searchParams.value}`)
        } else {
            router.push(`/shop/${props.params.recipient}/${props.params.category}/${Number(props.params.page) + 1}`)
        }
        } 
    }
  }

 const limit = 9
 const offset = (props.params.page - 1) * 9

return(
    <div>
      <ProductCards searchResults={searchResults} categories={categories[props.params.category]} category={props.params.category} limit={limit} offset={offset}/>
      <div className="flex flex-row justify-center">
            <div id="back" className="mr-7 border-2 border-black rounded-md" onClick={clickHandler}>
              Previous Page
            </div>
            <div className="w-8 border-2 border-black rounded-md">
              {props.params.page}
            </div>
            <div id="forward" className="ml-7 border-2 border-black rounded-md" onClick={clickHandler}>
              Next Page
            </div>
      </div>
    </div>
  )
}


export default PagePage