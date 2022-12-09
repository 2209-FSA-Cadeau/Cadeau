import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Card = props => {
    let path = usePathname()
    path = path.split("/")
    path.splice(3, path.length - 3)
    path = path.join("/")

    return (
        <div className="flex flex-col justify-evenly w-full h-100% p-7">
            <div className="grid grid-cols-3 gap-[3rem] ">
                {
                    props.productList.slice(props.offset, props.offset + props.limit).map((product, index) => (
                        <Link href={`${path}/singleproduct/${product.id}`} key={index}>
                            <div className="flex flex-col items-center border-2 border-black rounded-md w-40% h-40%"> 
                                <picture className="w-auto h-40%">
                                <img src={product.image} alt="" />
                                </picture>
                                <div>
                                Title: {product.title}
                                Link: {product.link}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )  
}

export default Card