"use client"

import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"

const AdminProductApproval = ({ product, onClose, refreshProducts }) => {
  const [status, setStatus] = useState(product.status || "pending")
  const [loading, setLoading] = useState(false)

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const updateProductStatus = async () => {
    if (!product._id) {
      toast.error("Product ID is missing!", {
        position: "top-center",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/update-product-status`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          status: status,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Failed to update product status")

      toast.success(`Product ${status === "approved" ? "approved" : "rejected"} successfully!`, {
        position: "top-center",
      })
      refreshProducts()
      onClose()
    } catch (error) {
      console.error("Error updating product status:", error)
      toast.error(error.message, {
        position: "top-center",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-blue-900 p-6 rounded-xl shadow-2xl w-96 border border-blue-200 dark:border-blue-800">
        <button
          className="ml-auto flex justify-end text-xl text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
          onClick={onClose}
        >
          <IoMdClose />
        </button>

        <h1 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">Product Approval</h1>

        <div className="mb-4">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Name:</strong> {product.name}
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Price:</strong> ₹{product.sellingPrice}
          </p>
          {product.images && product.images.length > 0 && (
            <div className="mt-2">
              <p className="text-blue-800 dark:text-blue-200">
                <strong>Product Image:</strong>
              </p>
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mt-1 border border-blue-200 dark:border-blue-700"
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-blue-800 dark:text-blue-200">Product Status:</label>
          <select
            className="border border-blue-300 dark:border-blue-600 px-4 py-2 w-full rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={handleChangeStatus}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button
          className="w-full py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:scale-105 duration-300"
          onClick={updateProductStatus}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  )
}

export default AdminProductApproval
