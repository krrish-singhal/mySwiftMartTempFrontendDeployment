"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment"
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from "../components/ChangeUserRole"

function AllUsers() {
  const [allUsers, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUser, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/all-users`, {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users")
      }

      setAllUsers(data.data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className="bg-white dark:bg-blue-900 pb-4 min-h-screen">
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full userTable">
          <thead>
            <tr className="bg-blue-600 dark:bg-blue-800 text-white">
              <th className="px-4 py-3 text-left">Sr.</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((el, index) => (
                <tr
                  key={el._id || index}
                  className="border-b border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors"
                >
                  <td className="px-4 py-3 text-blue-900 dark:text-blue-100">{index + 1}</td>
                  <td className="px-4 py-3 text-blue-900 dark:text-blue-100">{el?.name}</td>
                  <td className="px-4 py-3 text-blue-700 dark:text-blue-300">{el?.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        el?.role === "admin"
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                          : "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                      }`}
                    >
                      {el?.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-blue-700 dark:text-blue-300">{moment(el?.createdAt).format("LL")}</td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300 text-blue-600 dark:text-blue-200"
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-blue-500 dark:text-blue-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => {
            setOpenUpdateRole(false)
          }}
          name={updateUser.name}
          email={updateUser.email}
          role={updateUser.role}
          userId={updateUser._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  )
}

export default AllUsers
