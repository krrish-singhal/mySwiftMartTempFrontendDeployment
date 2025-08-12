"use client"

import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role)
  const [loading, setLoading] = useState(false)

  const handleChangeOnSelect = (e) => {
    setUserRole(e.target.value)
  }

  const updateUserRole = async () => {
    if (!userId || !email) {
      toast.error("User ID or email is missing!")
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        toast.error("You must be logged in to perform this action")
        return
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/update-user`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          role: userRole,
          userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to update role")
      }

      toast.success("User role updated successfully!")
      callFunc()
      onClose()
    } catch (error) {
      console.error("Error updating role:", error)
      toast.error(error.message || "Failed to update user role")
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

        <h1 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">Change User Role</h1>

        <div className="mb-4">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Name:</strong> {name}
          </p>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Email:</strong> {email}
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-blue-800 dark:text-blue-200">Select Role:</label>
          <select
            className="border border-blue-300 dark:border-blue-600 px-4 py-2 w-full rounded-lg bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500"
            value={userRole}
            onChange={handleChangeOnSelect}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button
          className="w-full py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:scale-105 duration-300"
          onClick={updateUserRole}
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Role"}
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
