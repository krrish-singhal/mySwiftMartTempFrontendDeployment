"use client"

import { useEffect, useState } from "react"
import UploadProduct from "../components/UploadProduct"
import AdminProductCard from "../components/AdminProductCard"

function AllProduct() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-product`)
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className="max-w-screen-lg mx-auto w-screen bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="bg-white dark:bg-blue-900 flex justify-between items-center py-4 px-6 shadow-lg border-b border-blue-200 dark:border-blue-800">
        <h2 className="font-bold text-lg text-blue-900 dark:text-blue-100">All Products</h2>
        <button
          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-2 px-6 rounded-full ml-auto font-medium shadow-lg hover:scale-105 duration-300"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-6 px-4">
        {allProduct.map((product, index) => {
          return <AdminProductCard data={product} key={index + "all Product"} fetchdata={fetchAllProduct} />
        })}
      </div>

      {openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />}
    </div>
  )
}

export default AllProduct
