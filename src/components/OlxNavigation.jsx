import { Link } from "react-router-dom"
import { FaStore, FaShoppingBag } from "react-icons/fa"

const OlxNavigation = ({ olxCartCount = 0 }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/olx-marketplace"
        className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-lg hover:scale-105"
      >
        <FaStore className="text-sm" />
        <span className="hidden md:block font-medium">OLX Market</span>
      </Link>

      <Link
        to="/olx-cart"
        className="text-2xl relative text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        <FaShoppingBag />
        {olxCartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-5 h-5 text-sm rounded-full flex items-center justify-center font-bold shadow-lg">
            {olxCartCount}
          </div>
        )}
      </Link>
    </div>
  )
}

export default OlxNavigation
