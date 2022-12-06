"use client"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleItem, clearSingleItem } from '../../../../../store/shopSlice'

const ProductIdPage = props => {
  const { singleProduct } = useSelector(state => state.shop);
  const dispatch = useDispatch();
  const product = singleProduct.product_results
  // const { primary_image, title, highlights, specifications, description } = product
  useEffect(() => {
    dispatch(getSingleItem(props.params.productId))
    return () => {
      dispatch(clearSingleItem())
    }
  }, [])

  return (
    <div className="flex">
      {product === undefined ?
        "Loading Product...":
      (<div>
        {console.log(product)}
        <div className="flex-none w-52 relative">
          <picture>
            <img src={product.primary_image} />
          </picture>
        </div>
        <div>
          {product.title}
        </div>
        <div>
          <h3>Price:</h3>
          <p>${product.sellers_online[0].total_price}</p>
        </div>
        <div>
          <h3>Description:</h3>
          <p>{product.description}</p>
        </div>
      </div>)}
    </div>
  )
}
  export default ProductIdPage;
