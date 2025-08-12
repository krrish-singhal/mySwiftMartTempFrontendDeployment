"use client";

import { useState } from "react";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import SummaryApi from "../common"; // adjust path if needed
import { toast } from "react-toastify";

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-blue-900 rounded-xl p-6 shadow-xl border border-blue-200 dark:border-blue-800 w-full max-w-sm">
        <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-4">Delete Product</h2>
        <p className="text-blue-800 dark:text-blue-200 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      const res = await fetch(`${SummaryApi.deleteProduct.url}/${data._id}`, {
        method: SummaryApi.deleteProduct.method.toUpperCase(),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result;
      try {
        result = await res.json();
      } catch {
        result = { message: await res.text() };
      }

      if (res.ok) {
        toast.success(result.message || "Product deleted successfully.");
        fetchdata();
      } else {
        toast.error(result.message || "Error deleting product.");
      }
    } catch (error) {
      toast.error("Network error while deleting product.");
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <div className="w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 flex flex-col">
        <div className="bg-white dark:bg-blue-900 p-4 rounded-xl shadow-lg flex flex-col items-center border border-blue-200 dark:border-blue-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <img
            src={data?.productImage?.[0] || "default-image.jpg"}
            className="w-full h-auto max-h-40 object-cover rounded-lg mb-3 hover:scale-105 transition-transform duration-300"
            alt={data?.productName || "Product"}
          />
          <h1 className="text-center font-semibold text-sm md:text-base lg:text-lg break-words mt-2 text-blue-900 dark:text-blue-100">
            {data?.productName || "No Name"}
          </h1>

          <div className="flex justify-between items-center w-full mt-3">
            <div className="text-blue-700 dark:text-blue-300 font-bold text-sm md:text-base lg:text-lg">
              {displayINRCurrency(data.sellingPrice)}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditProduct(true)}
                className="p-2 bg-blue-100 dark:bg-blue-800 hover:bg-blue-600 dark:hover:bg-blue-600 rounded-full hover:text-white cursor-pointer transition-all duration-300 text-blue-600 dark:text-blue-300"
                aria-label="Edit Product"
              >
                <MdModeEditOutline size={20} />
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="p-2 bg-red-100 dark:bg-red-800 hover:bg-red-600 dark:hover:bg-red-600 rounded-full hover:text-white cursor-pointer transition-all duration-300 text-red-600 dark:text-red-300"
                aria-label="Delete Product"
              >
                <MdDeleteOutline size={20} />
              </button>
            </div>
          </div>
        </div>

        {editProduct && (
          <AdminEditProduct
            productData={data}
            onClose={() => setEditProduct(false)}
            fetchData={fetchdata}
          />
        )}
      </div>
      <ConfirmModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default AdminProductCard;
