"use client"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleItem, clearSingleItem } from '../../../../../store/shopSlice'
import { saveItem } from '../../../../../store/recipientSlice';

const ProductIdPage = props => {
  const { singleProduct } = useSelector(state => state.shop);
  const { recipients } = useSelector(state => state.recipients)
  const dispatch = useDispatch();
  const product = singleProduct.product_results
  const curRecipient = recipients[0]
  useEffect(() => {
    dispatch(getSingleItem(props.params.productId))
    return () => {
      dispatch(clearSingleItem())
    }
  }, [])


  const handleSaveItem = () => {
    const saveObj = {
      recipientId: curRecipient.id,
      name: product.title,
      description: product.description,
      imageUrl: product.primary_image,
      price: product.sellers_online[0].base_price,
      link: product.sellers_online[0].link,
      rating: product.rating
    }
    dispatch(saveItem(saveObj))
  }

  return (
    <div className="flex rounded shadow p-2 bg-white">
      {product === undefined ?
        "Loading Product...":
      (<div className="">
        {console.log(product, recipients)}
        <div className="flex">
          <picture className="">
            <img src={product.primary_image} />
          </picture>
        </div>
        <div className="flex flex-col">
          <div>
            <h1>
              {product.title}
            </h1>
          </div>
          <div>
            <h3>Price:</h3>
            <p>${product.sellers_online[0].base_price}</p>
          </div>
          <div>
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>
          <button onClick={handleSaveItem}>Save This Item!</button>
        </div>
      </div>
      )}
    </div>
  )
}
  export default ProductIdPage;
