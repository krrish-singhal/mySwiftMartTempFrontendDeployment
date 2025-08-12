"use client"

import { useState } from "react"
import { CgClose } from "react-icons/cg"
import productCategory from "../helpers/productCategory"
import { FaCloudUploadAlt } from "react-icons/fa"
import uploadImage from "../helpers/uploadImage"
import DisplayImage from "./DisplayImage"
import { MdDelete } from "react-icons/md"
import { toast } from "react-toastify"

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      }
    })
  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      }
    })
  }

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index)

    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Unauthorized: Please log in again.")
      return
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload-product`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (responseData.success) {
      toast.success(responseData?.message)
      onClose()
      fetchData()
    } else {
      toast.error(responseData?.message || "Failed to upload product")
    }
  }

  return (
    <div className="fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-blue-900 p-6 rounded-xl w-full max-w-2xl h-full max-h-[80%] overflow-hidden shadow-2xl border border-blue-200 dark:border-blue-800">
        <div className="flex justify-between items-center pb-4 border-b border-blue-200 dark:border-blue-700">
          <h2 className="font-bold text-lg text-blue-900 dark:text-blue-100">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form className="grid p-4 gap-4 overflow-y-auto scrollbar-none h-full pb-5" onSubmit={handleSubmit}>
          <label htmlFor="productName" className="text-blue-800 dark:text-blue-200 font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            placeholder="enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-3 bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <label htmlFor="brandName" className="text-blue-800 dark:text-blue-200 font-medium mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-3 bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <label htmlFor="category" className="text-blue-800 dark:text-blue-200 font-medium mt-3">
            Category:
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-3 bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              )
            })}
          </select>

          <label htmlFor="productImage" className="text-blue-800 dark:text-blue-200 font-medium mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput" className="cursor-pointer">
            <div className="p-4 bg-blue-50 dark:bg-blue-800 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg h-32 w-full flex justify-center items-center hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors">
              <div className="text-blue-600 dark:text-blue-300 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm font-medium">Upload Product Image</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-3 flex-wrap">
                {data.productImage.map((el, index) => {
                  return (
                    <div key={el} className="relative group">
                      <img
                        src={el || "/placeholder.svg"}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 cursor-pointer rounded-lg object-cover hover:scale-105 transition-transform"
                        onClick={() => {
                          setOpenFullScreenImage(true)
                          setFullScreenImage(el)
                        }}
                      />

                      <div
                        className="absolute -top-2 -right-2 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer hover:bg-red-700 transition-colors"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete size={16} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-red-600 dark:text-red-400 text-xs">*Please upload product image</p>
            )}
          </div>

          <label htmlFor="price" className="text-blue-800 dark:text-blue-200 font-medium mt-3">
            Price:
          </label>
          <input
            type="number"
            id="price"
            placeholder="enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-3 bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <label htmlFor="sellingPrice" className="text-blue-800 dark:text-blue-200 font-medium mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-3 bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />

          <label htmlFor="description" className="text-blue-800 dark:text-blue-200 font-medium mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-blue-50 dark:bg-blue-800 border border-blue-200 dark:border-blue-700 rounded-lg resize-none p-3 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-6 py-3 bg-blue-600 text-white mb-10 hover:bg-blue-700 rounded-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300">
            Upload Product
          </button>
        </form>

        {openFullScreenImage && <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />}
      </div>
    </div>
  )
}

export default UploadProduct
