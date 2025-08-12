"use client"

import { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setUserDetails } from "../store/userSlice"
import { toast } from "react-toastify"
import { FaCamera, FaTimes, FaSpinner } from "react-icons/fa"

const ProfilePictureModal = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(user?.profilePic || "")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0]
    if (uploadedFile) {
      if (uploadedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB")
        return
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
      if (!validTypes.includes(uploadedFile.type)) {
        toast.error("Only JPEG, PNG, or GIF files are allowed")
        return
      }

      setFile(uploadedFile)
      setImagePreview(URL.createObjectURL(uploadedFile))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleUpdate = async () => {
    if (!file) {
      toast.error("Please select a file to upload")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("profilePic", file)

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/update-profile-picture`, {
        method: "put",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        dispatch(setUserDetails(data.user))
        onClose()
      } else {
        toast.error(data.message || "Failed to update profile picture")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update profile picture")
    } finally {
      setIsUploading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-blue-900 rounded-xl shadow-2xl w-full max-w-md p-6 relative border border-blue-200 dark:border-blue-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-blue-900 dark:text-blue-100">
          Update Profile Picture
        </h2>

        <div className="flex flex-col items-center justify-center mb-6">
          <div
            className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-300 dark:border-blue-700 relative mb-4 bg-blue-100 dark:bg-blue-800 flex items-center justify-center cursor-pointer group hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            onClick={triggerFileInput}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/default-profile.png"
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaCamera className="text-white text-2xl" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-blue-400 dark:text-blue-500">
                <FaCamera size={24} />
                <span className="text-xs mt-1">Upload Photo</span>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />

          <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
            Click on the image to select a new profile picture
            <br />
            (Max size: 5MB, Formats: JPEG, PNG, GIF)
          </p>
        </div>

        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!file || isUploading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
              !file || isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Uploading...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePictureModal
