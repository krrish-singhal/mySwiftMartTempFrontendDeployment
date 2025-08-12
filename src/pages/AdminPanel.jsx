import { useSelector } from "react-redux"
import { Link, Outlet, Navigate } from "react-router-dom"

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user)

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" />
  }

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden bg-blue-50 dark:bg-blue-950">
      <aside className="bg-white dark:bg-blue-900 min-h-full w-full max-w-60 shadow-xl border-r border-blue-200 dark:border-blue-800">
        <div className="p-4 border-b border-blue-200 dark:border-blue-800">
          <p className="capitalize text-lg font-semibold text-blue-900 dark:text-blue-100">{user?.name}</p>
          <p className="text-blue-600 dark:text-blue-400 text-sm">{user?.role}</p>
        </div>
        <nav className="grid p-4 gap-2">
          <Link
            to={"all-users"}
            className="px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-blue-800 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 transition-all duration-300 font-medium"
          >
            All Users
          </Link>
          <Link
            to={"all-products"}
            className="px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-blue-800 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 transition-all duration-300 font-medium"
          >
            Products
          </Link>
          <Link
            to={"all-orders"}
            className="px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-blue-800 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 transition-all duration-300 font-medium"
          >
            All Orders
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-blue-50 dark:bg-blue-950">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
