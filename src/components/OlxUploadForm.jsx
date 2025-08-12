import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaUpload, FaImage, FaTag, FaRupeeSign, FaAlignLeft, FaTimes } from "react-icons/fa"

// Constants
const CATEGORIES = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Books",
  "Sports",
  "Appliances",
  "Vehicles",
  "Toys",
  "Collectibles",
  "Other",
]

// Main component
const OlxUploadForm = ({ onClose, onSuccess }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    worthPrice: "",
    sellingPrice: "",
    description: "",
    reason: "",
    images: [],
  })
  const [previewUrls, setPreviewUrls] = useState([])

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle images - append images instead of replacing
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files)

    if (!newFiles || newFiles.length === 0) return

    // Check if adding these files would exceed the limit
    if (formData.images.length + newFiles.length > 5) {
      toast.warning("Maximum 5 images allowed", {
        position: "top-center",
      })
      return
    }

    // Append new files to existing ones
    const updatedImages = [...formData.images, ...newFiles]
    setFormData((prev) => ({ ...prev, images: updatedImages }))

    // Create new preview URLs and append to existing ones
    const newUrls = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls((prev) => [...prev, ...newUrls])
  }

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = [...formData.images]
    updatedImages.splice(index, 1)

    const updatedUrls = [...previewUrls]
    URL.revokeObjectURL(updatedUrls[index]) // Clean up URL object
    updatedUrls.splice(index, 1)

    setFormData((prev) => ({ ...prev, images: updatedImages }))
    setPreviewUrls(updatedUrls)
  }

  // Step validation
  const isStepValid = () => {
    if (step === 1) return formData.name && formData.category && formData.images.length > 0
    if (step === 2) return formData.worthPrice && formData.sellingPrice
    if (step === 3) return formData.description && formData.reason
    return true
  }

  // Navigation
  const nextStep = () => {
    if (isStepValid()) setStep((prev) => prev + 1)
    else toast.error("Please fill all required fields.", {
      position: "top-center",
    })
  }

  const prevStep = () => setStep((prev) => prev - 1)

  // Submit handler - properly handle FormData
  const handleSubmit = async () => {
    try {
      if (formData.images.length === 0) {
        toast.error("At least one image is required", {
          position: "top-center",
        })
        return
      }

      setLoading(true)

      // Prepare form data
      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("category", formData.category)
      submitData.append("worthPrice", formData.worthPrice)
      submitData.append("sellingPrice", formData.sellingPrice)
      submitData.append("description", formData.description)
      submitData.append("reason", formData.reason)

      formData.images.forEach((image) => {
        submitData.append("images", image)
      })

      // 1. Create Product
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/create-product`, {
        method: "POST",
        credentials: "include",
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product.")
      }

      console.log("Product created successfully with ID:", data.productId)

      // 2. Create Payment Session
      const paymentResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/listing-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: data.productId }),
      })

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || "Failed to initiate payment")
      }

      if (paymentData?.url) {
        // If payment URL received, redirect to Stripe checkout
        window.location.href = paymentData.url
      } else {
        throw new Error("Failed to initiate payment. Please try again later.")
      }
    } catch (error) {
      console.error("Error during submit and pay:", error)
      toast.error(error.message || "An unexpected error occurred.", {
        position: "top-center",
      })
    } finally {
      setLoading(false)
    }
  }

  // Render form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaTag className="text-yellow-600" />
              Basic Information
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Product Images (Selected: {formData.images.length}/5)
              </label>
              <div
                className="border-2 border-dashed p-4 rounded-md text-center cursor-pointer hover:bg-gray-50"
                onClick={() => document.getElementById("file-input").click()}
              >
                <FaImage className="text-3xl mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Click to upload</p>
              </div>
              <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" multiple />

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaRupeeSign className="text-yellow-600" />
              Pricing Information
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Original Worth (₹)</label>
              <input
                type="number"
                name="worthPrice"
                value={formData.worthPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
                placeholder="Original price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Selling Price (₹)</label>
              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
                placeholder="Your asking price"
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-700">
                Note: ₹100 listing fee will be charged. Product will be listed after admin approval.
              </p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaAlignLeft className="text-yellow-600" />
              Product Details
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1">Product Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 min-h-[100px]"
                placeholder="Describe product condition, features..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reason for Selling / Faults</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-500 min-h-[100px]"
                placeholder="Why are you selling? Mention any faults."
              />
            </div>

            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-700">Be honest about product faults to build buyer trust.</p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaUpload className="text-yellow-600" />
              Review & Submit
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Category:</strong> {formData.category}
              </p>
              <p>
                <strong>Worth Price:</strong> ₹{formData.worthPrice}
              </p>
              <p>
                <strong>Selling Price:</strong> ₹{formData.sellingPrice}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              <p>
                <strong>Reason:</strong> {formData.reason}
              </p>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-16 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-700">After submitting, you'll pay ₹100 to list your product.</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Final return
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">List Your Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>

        <div className="p-6">
          {/* Steps Progress */}
          <div className="flex justify-between mb-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {num}
                </div>
                <span className="text-xs mt-1">{["Basics", "Pricing", "Details", "Review"][num - 1]}</span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            {step > 1 ? (
              <button onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" disabled={loading}>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                disabled={loading || !isStepValid()}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit & Pay"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OlxUploadForm