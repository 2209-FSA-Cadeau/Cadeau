import React from "react"

const Card = props => {
    return (
        <div className="flex flex-col justify-evenly w-full h-100% p-7">
            <div className="grid grid-cols-3 gap-[3rem] ">
                {
                    props.productList.slice(props.offset, props.offset + props.limit).map((product, index) => (
                        <div key={index} className="flex flex-col items-center border-2 border-black rounded-md w-40% h-40%"> 
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

export default Card