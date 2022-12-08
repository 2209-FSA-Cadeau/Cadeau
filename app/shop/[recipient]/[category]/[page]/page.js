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
    
    // return ()=> {
    //   if(props.searchParams.filter){
    //     dispatch(filterOff())
    //   }
    // }
  }, [])

  // useEffect(() => {
  //   if(props.searchParams.filter){
  //     if(props.params.category === "search"){
  //       if(props.searchParams.filter === "under25"){
  //         dispatch((filterOn(searchResults.filter( result => result.price <= 25))))
  //       } else if(props.searchParams.filter === "25-50") {
  //         dispatch((filterOn(searchResults.filter( result => result.price >= 25 && result.price <= 50))))
  //       } else if(props.searchParams.filter === "50-100") {
  //         dispatch((filterOn(searchResults.filter( result => result.price >= 50 && result.price <= 100))))
  //       } else if(props.searchParams.filter === "100-200") {
  //         dispatch((filterOn(searchResults.filter( result => result.price >= 100 && result.price <= 200))))
  //       } else if(props.searchParams.filter === "200+") {
  //         dispatch((filterOn(searchResults.filter( result => result.price >= 200))))
  //       } else if(props.searchParams.filter === "5stars"){
  //         dispatch((filterOn(searchResults.filter( result => result.rating === 5))))
  //       } else if(props.searchParams.filter === "4stars"){
  //         dispatch((filterOn(searchResults.filter( result => result.rating === 4))))
  //       } else if(props.searchParams.filter === "3stars"){
  //         dispatch((filterOn(searchResults.filter( result => result.rating === 3))))
  //       } else if(props.searchParams.filter === "2stars"){
  //         dispatch((filterOn(searchResults.filter( result => result.rating === 2))))
  //       } else if(props.searchParams.filter === "1stars"){
  //         dispatch((filterOn(searchResults.filter( result => result.rating === 1))))
  //       }
  //     } else {
  //       if(props.searchParams.filter === "under25"){
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.price <= 25)))) 
  //       } else if(props.searchParams.filter === "25-50") {
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.price >= 25 && result.price <= 50))))
  //       } else if(props.searchParams.filter === "50-100") {
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.price >= 50 && result.price <= 100))))
  //       } else if(props.searchParams.filter === "100-200") {
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.price >= 100 && result.price <= 200))))
  //       } else if(props.searchParams.filter === "200+") {
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.price >= 200))))
  //       } else if(props.searchParams.filter === "5stars"){
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.rating === 5))))
  //       } else if(props.searchParams.filter === "4stars"){
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.rating === 4))))
  //       } else if(props.searchParams.filter === "3stars"){
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.rating === 3))))
  //       } else if(props.searchParams.filter === "2stars"){
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.rating === 2))))
  //       } else if(props.searchParams.filter === "1stars"){
  //         dispatch((filterOn(categories[props.params.category].filter( result => result.rating === 1))))
  //       }
  //     }
  //   }
  // }, [categories, searchResults])


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