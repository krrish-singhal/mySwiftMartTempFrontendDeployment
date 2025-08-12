"use client"

import { useEffect, useState, useContext } from "react"
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct"
import displayINRCurrency from "../helpers/displayCurrency"
import { Link } from "react-router-dom"
import addToCart from "../helpers/addToCart"
import scrollTop from "../helpers/scrollTop"
import Context from "../context"

const CategroyWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(8).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setData(categoryProduct?.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4 text-blue-800 dark:text-blue-200">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="h-[420px] bg-blue-50 dark:bg-blue-900 shadow-lg rounded-xl p-4 animate-pulse flex flex-col border border-blue-200 dark:border-blue-800"
              >
                <div className="bg-blue-200 dark:bg-blue-800 h-48 w-full mb-4 rounded-lg"></div>
                <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-full mb-2"></div>
                <div className="h-8 bg-blue-200 dark:bg-blue-800 rounded-full w-full mt-auto"></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="bg-white dark:bg-blue-900 shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-200 dark:border-blue-800 overflow-hidden"
                onClick={scrollTop}
              >
                <div className="h-48 bg-blue-50 dark:bg-blue-800 flex items-center justify-center p-4">
                  <img
                    src={product.productImage[0] || "/placeholder.svg"}
                    alt={product.productName}
                    className="object-contain h-full w-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="font-medium text-lg line-clamp-1 text-blue-900 dark:text-blue-100">
                    {product?.productName}
                  </h2>
                  <p className="text-sm text-blue-600 dark:text-blue-300 capitalize">{product?.category}</p>
                  <div className="flex justify-between text-sm font-medium">
                    <p className="text-blue-700 dark:text-blue-200 font-bold">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="line-through text-blue-400 dark:text-blue-500">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm mt-auto font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}

export default CategroyWiseProductDisplay
