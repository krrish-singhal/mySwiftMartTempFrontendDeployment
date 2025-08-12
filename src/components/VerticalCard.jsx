"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import scrollTop from "../helpers/scrollTop"
import Context from "../context"
import displayINRCurrency from "../helpers/displayCurrency"
import addToCart from "../helpers/addToCart"

function VerticalCard({ loading, data = [] }) {
  const { fetchUserAddToCart } = useContext(Context)
  const loadingList = new Array(10).fill(null)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-3 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-blue-50 dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 overflow-hidden"
                key={index}
              >
                <div className="bg-blue-200 dark:bg-blue-800 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 animate-pulse rounded-full bg-blue-200 dark:bg-blue-800"></h2>
                  <p className="capitalize p-1 animate-pulse rounded-full bg-blue-200 dark:bg-blue-800 py-2"></p>
                  <div className="flex gap-3">
                    <p className="p-1 animate-pulse rounded-full bg-blue-200 dark:bg-blue-800 w-full py-2"></p>
                    <p className="p-1 animate-pulse rounded-full bg-blue-200 dark:bg-blue-800 w-full py-2"></p>
                  </div>
                  <button className="text-sm px-3 rounded-full bg-blue-200 dark:bg-blue-800 py-2 animate-pulse"></button>
                </div>
              </div>
            )
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white dark:bg-blue-900 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-200 dark:border-blue-800 overflow-hidden"
                key={product?._id}
                onClick={scrollTop}
              >
                <div className="bg-blue-50 dark:bg-blue-800 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product.productImage[0] || "/placeholder.svg"}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-blue-900 dark:text-blue-100">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-blue-600 dark:text-blue-300">{product?.category}</p>
                  <div className="flex gap-3">
                    <p className="text-blue-700 dark:text-blue-200 font-bold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-blue-400 dark:text-blue-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            )
          })}
    </div>
  )
}

export default VerticalCard
