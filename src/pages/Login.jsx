import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setUserDetails, setToken } from "../store/userSlice"
import GoogleAuthButton from "../components/GoogleAuthButton"
import loginSVG from '../../assest/login.gif'

// Use a production-grade SVG illustration (undraw.co)


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const dataApi = await response.json()
    if (dataApi.success) {
      toast.success(dataApi.message)
      dispatch(setUserDetails(dataApi.user))
      dispatch(setToken(dataApi.token))
      localStorage.setItem("token", dataApi.token)
      navigate("/")
    } else {
      toast.error(dataApi.message)
    }
  }

  return (
    <section id="login" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-[#101624] dark:via-[#192040] dark:to-[#101624] transition-colors duration-300">
      <div className="w-full max-w-md bg-white/90 dark:bg-[#181f32] rounded-2xl shadow-2xl p-8 mx-2 transition-all duration-300">
        <div className="flex flex-col items-center">
          <img src={loginSVG} alt="Login illustration" className="w-28 h-28 mb-4 object-contain" />
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-2">Welcome Back</h2>
          <p className="text-blue-500 dark:text-blue-300 mb-4">Login to your Swift Mart account</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-blue-700 dark:text-blue-200 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-[#232b43] text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-blue-700 dark:text-blue-200 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-[#232b43] text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
              <button
                type="button"
                className="absolute right-3 inset-y-0 flex items-center bg-transparent text-gray-500 dark:text-gray-300 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <Link to={"/forgot-password"} className="block w-fit ml-auto text-sm text-blue-500 hover:underline hover:text-blue-700 mt-1 transition">
              Forgot password?
            </Link>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-all mx-auto block mt-2">
            Login
          </button>
        </form>
        <div className="my-6 flex items-center justify-center">
          <div className="border-t border-blue-200 dark:border-blue-700 flex-grow"></div>
          <span className="mx-4 text-blue-400 dark:text-blue-300 text-sm">OR</span>
          <div className="border-t border-blue-200 dark:border-blue-700 flex-grow"></div>
        </div>
        <div className="mb-4">
          <GoogleAuthButton text="Login with Google" />
        </div>
        <p className="mt-4 text-center text-blue-600 dark:text-blue-300">
          Don't have an account?{" "}
          <Link to={"/sign-up"} className="text-blue-700 dark:text-blue-200 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
