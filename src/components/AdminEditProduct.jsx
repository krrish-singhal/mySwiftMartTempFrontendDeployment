"use client"

import { useState } from "react"
import { CgClose } from "react-icons/cg"
import productCategory from "../helpers/productCategory"
import { FaCloudUploadAlt } from "react-icons/fa"
import uploadImage from "../helpers/uploadImage"
import DisplayImage from "./DisplayImage"
import { MdDelete } from "react-icons/md"
import { toast } from "react-toastify"

const AdminEditProduct = ({ onClose, productData, fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productImage: productData?.productImage || [],
  })

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProduct = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const uploadImageCloudinary = await uploadImage(file)
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }))
    }
  }

  const handleDeleteProductImage = (index) => {
    setData((prev) => {
      const newProductImage = [...prev.productImage]
      newProductImage.splice(index, 1)
      return { ...prev, productImage: newProductImage }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Unauthorized: Please log in again.")
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/update-product`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.message)

      toast.success(result.message)
      onClose()
      fetchData()
    } catch (err) {
      toast.error(err.message || "Error updating product")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-blue-900 w-full max-w-2xl max-h-[90%] h-auto rounded-xl p-6 shadow-xl relative border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center pb-4 border-b border-blue-200 dark:border-blue-700">
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-2xl text-blue-800 hover:text-red-600 dark:text-blue-100 dark:hover:text-red-400"
          >
            <CgClose />
          </button>
        </div>

        <form
          className="grid gap-5 mt-4 max-h-[70vh] overflow-y-auto no-scrollbar pr-1"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Product Name:</label>
            <input
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Brand Name:</label>
            <input
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Category:</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {productCategory.map((el, i) => (
                <option value={el.value} key={i}>{el.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Product Image:</label>
            <label htmlFor="uploadImageInput" className="cursor-pointer">
              <div className="p-4 h-32 border-2 border-dashed rounded-lg bg-blue-50 dark:bg-blue-800 border-blue-300 dark:border-blue-600 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-700 transition">
                <div className="flex flex-col items-center text-blue-600 dark:text-blue-300">
                  <FaCloudUploadAlt className="text-4xl" />
                  <p className="text-sm font-medium">Upload Image</p>
                </div>
                <input
                  id="uploadImageInput"
                  type="file"
                  className="hidden"
                  onChange={handleUpdateProduct}
                />
              </div>
            </label>

            {data.productImage.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {data.productImage.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt="product"
                      onClick={() => {
                        setFullScreenImage(url)
                        setOpenFullScreenImage(true)
                      }}
                      className="w-20 h-20 object-cover border-2 rounded-lg cursor-pointer border-blue-200 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteProductImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hidden group-hover:block"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Price:</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleOnChange}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Selling Price:</label>
            <input
              type="number"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-blue-800 dark:text-blue-200 font-medium">Description:</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              className="p-3 rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
              placeholder="Enter product description..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-2 shadow-lg transition-all hover:scale-105"
          >
            Update Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  )
}

export default AdminEditProduct
