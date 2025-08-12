import CANCELIMAGE from "../assets/cancel.gif"
import { Link } from "react-router-dom"

const Cancel = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 m-4 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
      <img src={CANCELIMAGE || "/placeholder.svg"} width={150} height={150} className="mix-blend-multiply mb-4" />
      <p className="text-red-600 dark:text-red-400 font-bold text-xl mb-2">Payment Cancelled</p>
      <p className="text-blue-600 dark:text-blue-400 text-center mb-4">
        Your payment was cancelled. You can try again or return to your cart.
      </p>
      <Link
        to={"/cart"}
        className="p-3 px-6 mt-2 border-2 border-blue-600 rounded-full font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:scale-105"
      >
        Go To Cart
      </Link>
    </div>
  )
}

export default Cancel
